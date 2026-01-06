"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserProfileMenu } from "@/components/user-profile-menu";
import { Shield, FileText, Database, TrendingUp, Users, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/sidebar-nav";

const sidebarNavItems = [
    {
        title: "Profile",
        href: "/dashboard/settings/profile",
    },
    {
        title: "Security",
        href: "/dashboard/settings/security",
    },
    {
        title: "Billing",
        href: "/dashboard/settings/billing",
    },
    {
        title: "Preferences",
        href: "/dashboard/settings/preferences",
    },
];

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-background">
            {/* Main Content Wrapper */}
            <div className="min-h-screen flex flex-col">
                {/* Settings Content */}
                <main className="flex-1 p-8">
                    <div className="space-y-6 max-w-5xl mx-auto">
                        <div className="space-y-0.5">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Settings</h2>
                            <p className="text-slate-500 dark:text-slate-400">
                                Manage your account settings and set e-mail preferences.
                            </p>
                        </div>
                        <Separator className="my-6" />
                        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                            <aside className="-mx-4 lg:w-1/5">
                                <SidebarNav items={sidebarNavItems} />
                            </aside>
                            <div className="flex-1 lg:max-w-2xl">{children}</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
