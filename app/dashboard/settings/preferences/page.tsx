"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
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
import { useLanguage } from "@/context/language-context";

type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";

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
    const { setTheme, theme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [dateFormat, setDateFormat] = useState<DateFormat>("MM/DD/YYYY");
    const [isSaving, setIsSaving] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Initialize notification states
    const [notifications, setNotifications] = useState(
        notificationSettings.reduce((acc, setting) => ({
            ...acc,
            [setting.id]: setting.defaultValue,
        }), {} as Record<string, boolean>)
    );

    // Handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    const themeOptions = [
        {
            value: "light",
            label: t("theme.light"),
            icon: Sun,
        },
        {
            value: "dark",
            label: t("theme.dark"),
            icon: Moon,
        },
    ];

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
            toast.success(language === 'id' ? "Preferensi Disimpan" : "Preferences Saved", {
                description: language === 'id' ? "Preferensi Anda telah berhasil diperbarui." : "Your preferences have been updated successfully.",
            });
            console.log({
                theme,
                language,
                dateFormat,
                notifications,
            });
        }, 1500);
    };

    if (!mounted) {
        return null; // Prevent hydration mismatch
    }

    return (
        <div className="space-y-6">
            {/* Appearance Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle>{t("settings.appearance.title")}</CardTitle>
                    <CardDescription>
                        {t("settings.appearance.desc")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        {themeOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected = theme === option.value;

                            return (
                                <button
                                    key={option.value}
                                    onClick={() => setTheme(option.value)}
                                    className={`relative flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all ${isSelected
                                        ? "border-blue-600 ring-2 ring-blue-100 bg-blue-50 dark:bg-blue-900/20"
                                        : "border-slate-200 hover:border-slate-300 bg-white dark:bg-slate-950 dark:border-slate-800"
                                        }`}
                                >
                                    <span className={`p-3 rounded-lg ${option.value === "light" ? "bg-white border border-slate-200 text-slate-900" :
                                        option.value === "dark" ? "bg-slate-900 text-white border border-slate-800" :
                                            "bg-gradient-to-r from-white to-slate-900 text-slate-600"
                                        }`}>
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <span className="text-center">
                                        <span className="font-medium text-slate-900 dark:text-slate-100">{option.label}</span>
                                    </span>
                                    {isSelected && (
                                        <span className="absolute top-2 right-2 bg-blue-600 rounded-full p-1">
                                            <Check className="h-3 w-3 text-white" />
                                        </span>
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
                    <CardTitle>{t("settings.regional.title")}</CardTitle>
                    <CardDescription>
                        {t("settings.regional.desc")}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Language */}
                    <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={language} onValueChange={(val: any) => setLanguage(val)}>
                            <SelectTrigger id="language" className="focus:ring-purple-500/50">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">{t("lang.en")}</SelectItem>
                                <SelectItem value="id">{t("lang.id")}</SelectItem>
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
                            Preview: <span className="font-medium text-slate-700 dark:text-slate-300">{formatDatePreview(dateFormat)}</span>
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Notifications Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-purple-600" />
                        {t("settings.notifications.title")}
                    </CardTitle>
                    <CardDescription>
                        {t("settings.notifications.desc")}
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
                                                className="font-semibold text-slate-900 dark:text-slate-100 cursor-pointer"
                                            >
                                                {setting.title}
                                            </Label>
                                            {setting.locked && (
                                                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded dark:bg-slate-800 dark:text-slate-400">
                                                    Required
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
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
                            {t("saving")}
                        </>
                    ) : (
                        t("save")
                    )}
                </Button>
            </div>
        </div>
    );
}
