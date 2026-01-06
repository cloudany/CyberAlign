"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Eye,
    EyeOff,
    Loader2,
    Smartphone,
    Laptop,
    Smartphone as Phone,
    AlertTriangle,
    Shield,
    CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const passwordFormSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

// Mock active sessions data
const activeSessions = [
    {
        id: 1,
        device: "Chrome on Windows",
        location: "Jakarta, ID",
        status: "Current Session",
        icon: Laptop,
        isCurrent: true,
    },
    {
        id: 2,
        device: "Safari on iPhone 14",
        location: "Surabaya, ID",
        status: "2 hours ago",
        icon: Phone,
        isCurrent: false,
    },
];

export default function SecuritySettingsPage() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [isEnabling2FA, setIsEnabling2FA] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        },
    });

    const calculatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
        return Math.min(strength, 100);
    };

    const handlePasswordChange = (value: string) => {
        const strength = calculatePasswordStrength(value);
        setPasswordStrength(strength);
    };

    const getPasswordStrengthLabel = () => {
        if (passwordStrength < 40) return { label: "Weak", color: "bg-red-500" };
        if (passwordStrength < 70) return { label: "Medium", color: "bg-yellow-500" };
        return { label: "Strong", color: "bg-green-500" };
    };

    function onPasswordSubmit(data: PasswordFormValues) {
        setIsUpdatingPassword(true);

        setTimeout(() => {
            setIsUpdatingPassword(false);
            toast.success("Password Updated", {
                description: "Your password has been changed successfully.",
            });
            form.reset();
            setPasswordStrength(0);
        }, 1500);
    }

    const handleEnable2FA = () => {
        setIsEnabling2FA(true);

        setTimeout(() => {
            setIsEnabling2FA(false);
            setIs2FAEnabled(true);
            toast.success("2FA Enabled", {
                description: "Two-factor authentication has been enabled for your account.",
            });
        }, 1500);
    };

    const handleLogoutOtherDevices = () => {
        toast.success("Sessions Terminated", {
            description: "All other devices have been logged out successfully.",
        });
    };

    const handleDeleteAccount = () => {
        toast.error("Account Deletion", {
            description: "This action is irreversible. Please contact support to proceed.",
        });
    };

    const strengthInfo = getPasswordStrengthLabel();

    return (
        <div className="space-y-6">
            {/* Password Update Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle>Password Update</CardTitle>
                    <CardDescription>
                        Change your password to keep your account secure.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onPasswordSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={showCurrentPassword ? "text" : "password"}
                                                    placeholder="Enter current password"
                                                    {...field}
                                                    className="pr-10 focus-visible:ring-purple-500/50"
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                                            >
                                                {showCurrentPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={showNewPassword ? "text" : "password"}
                                                    placeholder="Enter new password"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handlePasswordChange(e.target.value);
                                                    }}
                                                    className="pr-10 focus-visible:ring-purple-500/50"
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                                            >
                                                {showNewPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>

                                        {/* Password Strength Indicator */}
                                        {field.value && (
                                            <div className="space-y-2 mt-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-slate-500">Password Strength</span>
                                                    <span className={`font-medium ${strengthInfo.label === "Weak" ? "text-red-600" :
                                                        strengthInfo.label === "Medium" ? "text-yellow-600" :
                                                            "text-green-600"
                                                        }`}>
                                                        {strengthInfo.label}
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all duration-300 ${strengthInfo.color}`}
                                                        style={{ width: `${passwordStrength}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                variant="outline"
                                disabled={isUpdatingPassword}
                                className="w-full sm:w-auto"
                            >
                                {isUpdatingPassword ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Password"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Two-Factor Authentication Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-purple-600" />
                        Two-Factor Authentication (2FA)
                    </CardTitle>
                    <CardDescription>
                        Add an extra layer of security to your account by enabling 2FA.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                        <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Secure your account</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                Two-factor authentication adds an additional layer of security by requiring
                                more than just a password to sign in.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</p>
                            <Badge
                                variant={is2FAEnabled ? "default" : "secondary"}
                                className={is2FAEnabled ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"}
                            >
                                {is2FAEnabled ? (
                                    <>
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        Enabled
                                    </>
                                ) : (
                                    "Not Enabled"
                                )}
                            </Badge>
                        </div>

                        {!is2FAEnabled && (
                            <Button
                                onClick={handleEnable2FA}
                                disabled={isEnabling2FA}
                                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90"
                            >
                                {isEnabling2FA ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Enabling...
                                    </>
                                ) : (
                                    "Enable 2FA"
                                )}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Active Sessions Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>
                        Manage your active sessions across different devices.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        {activeSessions.map((session) => {
                            const Icon = session.icon;
                            return (
                                <div
                                    key={session.id}
                                    className={`flex items-start gap-4 p-4 rounded-lg border ${session.isCurrent
                                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                                        : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${session.isCurrent ? "bg-blue-100 dark:bg-blue-800" : "bg-slate-100 dark:bg-slate-800"
                                        }`}>
                                        <Icon className={`h-5 w-5 ${session.isCurrent ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"
                                            }`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-900 dark:text-slate-100">{session.device}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {session.location} • {session.status}
                                        </p>
                                    </div>
                                    {session.isCurrent && (
                                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                            Current
                                        </Badge>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <Separator />

                    <Button
                        variant="outline"
                        onClick={handleLogoutOtherDevices}
                        className="w-full sm:w-auto"
                    >
                        Log out all other devices
                    </Button>
                </CardContent>
            </Card>

            {/* Danger Zone Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow border-red-200">
                <CardHeader>
                    <CardTitle className="text-red-600 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Danger Zone
                    </CardTitle>
                    <CardDescription>
                        Irreversible and destructive actions.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900">
                        <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">Delete Account</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteAccount}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete Account
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
