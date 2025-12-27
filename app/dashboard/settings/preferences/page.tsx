"use client";

import { useState } from "react";
import {
    Moon,
    Sun,
    Monitor,
    Bell,
    Mail,
    Loader2,
    Check
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type Theme = "light" | "dark" | "system";
type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";

const themeOptions = [
    {
        value: "light" as Theme,
        label: "Light",
        icon: Sun,
        description: "Light mode",
    },
    {
        value: "dark" as Theme,
        label: "Dark",
        icon: Moon,
        description: "Dark mode",
    },
    {
        value: "system" as Theme,
        label: "System",
        icon: Monitor,
        description: "System default",
    },
];

const notificationSettings = [
    {
        id: "analysis-completed",
        title: "Analysis Completed",
        description: "Get notified when a document scan is finished.",
        defaultValue: true,
    },
    {
        id: "critical-gaps",
        title: "Critical Gaps",
        description: "Immediate alerts when high-severity risks are detected.",
        defaultValue: true,
        locked: true,
    },
    {
        id: "weekly-digest",
        title: "Weekly Digest",
        description: "A summary of your compliance progress.",
        defaultValue: true,
    },
    {
        id: "product-updates",
        title: "Product Updates",
        description: "New features and security news.",
        defaultValue: false,
    },
];

export default function PreferencesSettingsPage() {
    const [selectedTheme, setSelectedTheme] = useState<Theme>("system");
    const [language, setLanguage] = useState("en");
    const [dateFormat, setDateFormat] = useState<DateFormat>("MM/DD/YYYY");
    const [isSaving, setIsSaving] = useState(false);

    // Initialize notification states
    const [notifications, setNotifications] = useState(
        notificationSettings.reduce((acc, setting) => ({
            ...acc,
            [setting.id]: setting.defaultValue,
        }), {} as Record<string, boolean>)
    );

    const formatDatePreview = (format: DateFormat) => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        switch (format) {
            case "MM/DD/YYYY":
                return `${month}/${day}/${year}`;
            case "DD/MM/YYYY":
                return `${day}/${month}/${year}`;
            case "YYYY-MM-DD":
                return `${year}-${month}-${day}`;
            default:
                return "";
        }
    };

    const handleNotificationToggle = (id: string, value: boolean) => {
        setNotifications(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSavePreferences = () => {
        setIsSaving(true);

        setTimeout(() => {
            setIsSaving(false);
            toast.success("Preferences Saved", {
                description: "Your preferences have been updated successfully.",
            });
            console.log({
                theme: selectedTheme,
                language,
                dateFormat,
                notifications,
            });
        }, 1500);
    };

    return (
        <div className="space-y-6">
            {/* Appearance Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                        Select your preferred interface theme.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        {themeOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected = selectedTheme === option.value;

                            return (
                                <button
                                    key={option.value}
                                    onClick={() => setSelectedTheme(option.value)}
                                    className={`relative flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all ${isSelected
                                            ? "border-blue-600 ring-2 ring-blue-100 bg-blue-50"
                                            : "border-slate-200 hover:border-slate-300 bg-white"
                                        }`}
                                >
                                    <div className={`p-3 rounded-lg ${option.value === "light" ? "bg-white border border-slate-200" :
                                            option.value === "dark" ? "bg-slate-900" :
                                                "bg-gradient-to-r from-white to-slate-900"
                                        }`}>
                                        <Icon className={`h-6 w-6 ${option.value === "dark" ? "text-white" : "text-slate-900"
                                            }`} />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-medium text-slate-900">{option.label}</p>
                                    </div>
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 bg-blue-600 rounded-full p-1">
                                            <Check className="h-3 w-3 text-white" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Localization Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle>Regional Settings</CardTitle>
                    <CardDescription>
                        Set your language and date formats for audit logs.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Language */}
                    <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger id="language" className="focus:ring-purple-500/50">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="id">Bahasa Indonesia</SelectItem>
                                <SelectItem value="fr">Français</SelectItem>
                                <SelectItem value="de">Deutsch</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    {/* Date Format */}
                    <div className="space-y-2">
                        <Label htmlFor="date-format">Date Format</Label>
                        <Select value={dateFormat} onValueChange={(value) => setDateFormat(value as DateFormat)}>
                            <SelectTrigger id="date-format" className="focus:ring-purple-500/50">
                                <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-slate-500">
                            Preview: <span className="font-medium text-slate-700">{formatDatePreview(dateFormat)}</span>
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Notifications Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-purple-600" />
                        Email Notifications
                    </CardTitle>
                    <CardDescription>
                        Choose what updates you want to receive.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {notificationSettings.map((setting, index) => (
                            <div key={setting.id}>
                                <div className="flex items-start justify-between gap-4 py-3">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Label
                                                htmlFor={setting.id}
                                                className="font-semibold text-slate-900 cursor-pointer"
                                            >
                                                {setting.title}
                                            </Label>
                                            {setting.locked && (
                                                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                                                    Required
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500">
                                            {setting.description}
                                        </p>
                                    </div>
                                    <Switch
                                        id={setting.id}
                                        checked={notifications[setting.id]}
                                        onCheckedChange={(checked) => handleNotificationToggle(setting.id, checked)}
                                        disabled={setting.locked}
                                        className="data-[state=checked]:bg-blue-600"
                                    />
                                </div>
                                {index < notificationSettings.length - 1 && <Separator />}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Save Button - Sticky */}
            <div className="sticky bottom-6 flex justify-end pt-4">
                <Button
                    onClick={handleSavePreferences}
                    disabled={isSaving}
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg min-w-[160px]"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        "Save Preferences"
                    )}
                </Button>
            </div>
        </div>
    );
}
