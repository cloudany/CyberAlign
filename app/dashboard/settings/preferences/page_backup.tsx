"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Lock, Trash2, Camera } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const profileFormSchema = z.object({
    fullName: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(30, {
            message: "Name must not be longer than 30 characters.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    jobTitle: z.string().max(50).optional(),
    timezone: z.string({
        required_error: "Please select a timezone.",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    fullName: "John Doe",
    email: "john@company.com",
    jobTitle: "CISO",
    timezone: "gmt+7",
};

export default function ProfileSettingsPage() {
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
    const [avatarSrc, setAvatarSrc] = useState("/avatars/01.png");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    });

    function onSubmit(data: ProfileFormValues) {
        setIsSaving(true);

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Profile Updated", {
                description: "Your changes have been saved successfully.",
            });
            console.log(data);
        }, 1500);
    }

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Invalid file type", {
                description: "Please upload an image file (PNG, JPG, etc)."
            });
            setIsUploading(false);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            // Simulate upload delay
            setTimeout(() => {
                if (e.target?.result) {
                    setAvatarSrc(e.target.result as string);
                }
                setIsUploading(false);
                toast.success("Avatar updated successfully");
            }, 1000);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Card 1: Public Profile */}
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle>Public Profile</CardTitle>
                            <CardDescription>
                                This information will be displayed on your profile.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Avatar Section */}
                            <div className="flex items-center gap-x-6">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <div
                                    className="relative group cursor-pointer"
                                    onMouseEnter={() => setIsHoveringAvatar(true)}
                                    onMouseLeave={() => setIsHoveringAvatar(false)}
                                    onClick={handleAvatarClick}
                                >
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={avatarSrc} alt="@johndoe" className="object-cover" />
                                        <AvatarFallback className="text-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                                            {isUploading ? <Loader2 className="h-8 w-8 animate-spin" /> : "JD"}
                                        </AvatarFallback>
                                    </Avatar>
                                    {/* Hover Overlay */}
                                    {isHoveringAvatar && !isUploading && (
                                        <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center transition-opacity">
                                            <Camera className="h-8 w-8 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleAvatarClick}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            "Change Avatar"
                                        )}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => setAvatarSrc("")}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Remove
                                    </Button>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John Doe"
                                                    {...field}
                                                    className="focus-visible:ring-purple-500/50"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="jobTitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Job Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. CISO"
                                                    {...field}
                                                    className="focus-visible:ring-purple-500/50"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 2: Account Details */}
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle>Account Details</CardTitle>
                            <CardDescription>
                                Manage your sign-in information and private details.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Work Email</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    placeholder="john@company.com"
                                                    {...field}
                                                    disabled
                                                    className="pr-10 bg-muted/50 cursor-not-allowed"
                                                />
                                            </FormControl>
                                            <Lock className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                                        </div>
                                        <FormDescription>
                                            Contact your administrator to change your email address.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Card 3: System Preferences */}
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle>System Preferences</CardTitle>
                            <CardDescription>
                                Adjust settings that affect your workspace and reporting.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="timezone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Audit Timezone</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="focus:ring-purple-500/50">
                                                    <SelectValue placeholder="Select a timezone" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="gmt+7">GMT+7 (Bangkok, Hanoi, Jakarta)</SelectItem>
                                                <SelectItem value="gmt+0">GMT+0 (London)</SelectItem>
                                                <SelectItem value="est">EST (New York)</SelectItem>
                                                <SelectItem value="pst">PST (Los Angeles)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            This timezone will be used for all timestamps in your security audit logs.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Save Button - Sticky */}
                    <div className="sticky bottom-6 flex justify-end pt-4">
                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg min-w-[140px]"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

