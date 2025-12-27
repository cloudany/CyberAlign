"use client";

import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    User,
    ShieldCheck,
    CreditCard,
    Moon,
    Globe,
    LifeBuoy,
    LogOut,
    ChevronRight,
} from "lucide-react";

export function UserProfileMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 rounded-full transition-all duration-200">
                    <Avatar className="h-10 w-10 border border-slate-200">
                        {/* <AvatarImage src="/avatars/01.png" alt="@johndoe" /> */}
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold">
                            JD
                        </AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 rounded-xl shadow-lg border border-slate-100 p-2" align="end">
                {/* Section A: User Info Header */}
                <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-9 w-9 border border-slate-100">
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs">
                            JD
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-slate-900 truncate">John Doe</p>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-[10px] px-1.5 h-5">
                                PRO
                            </Badge>
                        </div>
                        <p className="text-xs text-slate-500 truncate">john@company.com</p>
                    </div>
                </div>

                <DropdownMenuSeparator className="my-1 bg-slate-100" />

                {/* Section B: Account Group */}
                <div className="space-y-1">
                    <Link href="/dashboard/settings/profile">
                        <DropdownMenuItem className="cursor-pointer hover:bg-slate-50 rounded-md focus:bg-slate-50 text-slate-700">
                            <User className="mr-2 h-4 w-4 text-slate-500" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/settings/security">
                        <DropdownMenuItem className="cursor-pointer hover:bg-slate-50 rounded-md focus:bg-slate-50 text-slate-700">
                            <ShieldCheck className="mr-2 h-4 w-4 text-slate-500" />
                            <span>Security</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/settings/billing">
                        <DropdownMenuItem className="cursor-pointer hover:bg-slate-50 rounded-md focus:bg-slate-50 text-slate-700">
                            <CreditCard className="mr-2 h-4 w-4 text-slate-500" />
                            <span>Billing</span>
                        </DropdownMenuItem>
                    </Link>
                </div>

                <DropdownMenuSeparator className="my-1 bg-slate-100" />

                {/* Section C: Preferences Group */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between px-2 py-1.5 text-sm rounded-md hover:bg-slate-50 cursor-default">
                        <div className="flex items-center text-slate-700">
                            <Moon className="mr-2 h-4 w-4 text-slate-500" />
                            <span>Dark Mode</span>
                        </div>
                        <Switch id="dark-mode" className="scale-75 data-[state=checked]:bg-blue-600" />
                    </div>
                    <Link href="/dashboard/settings/preferences">
                        <DropdownMenuItem className="cursor-pointer hover:bg-slate-50 rounded-md focus:bg-slate-50 text-slate-700 justify-between">
                            <div className="flex items-center">
                                <Globe className="mr-2 h-4 w-4 text-slate-500" />
                                <span>Language</span>
                            </div>
                            <span className="text-xs font-medium text-slate-500 flex items-center">
                                ID <ChevronRight className="ml-1 h-3 w-3" />
                            </span>
                        </DropdownMenuItem>
                    </Link>
                </div>

                <DropdownMenuSeparator className="my-1 bg-slate-100" />

                {/* Section D: Support & Logout */}
                <div className="space-y-1">
                    <Link href="#">
                        <DropdownMenuItem className="cursor-pointer hover:bg-slate-50 rounded-md focus:bg-slate-50 text-slate-700">
                            <LifeBuoy className="mr-2 h-4 w-4 text-slate-500" />
                            <span>Help & Support</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/">
                        <DropdownMenuItem className="cursor-pointer hover:bg-red-50 focus:bg-red-50 rounded-md text-red-600 focus:text-red-600">
                            <LogOut className="mr-2 h-4 w-4 text-red-600" />
                            <span>Log Out</span>
                        </DropdownMenuItem>
                    </Link>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
