"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, Lock, ShieldCheck } from "lucide-react";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement authentication
        window.location.href = "/dashboard";
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen grid grid-cols-1 lg:grid-cols-2"
        >
            {/* Left Section - Form */}
            <div className="flex flex-col justify-center px-8 py-12 lg:px-16 bg-white">
                <div className="w-full max-w-md mx-auto">
                    {/* Logo */}
                    <div className="mb-8">
                        <Link href="/">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                CyberAlign
                            </h1>
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                            Welcome back
                        </h2>
                        <p className="text-slate-500">
                            Enter your credentials to access the workspace.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 focus-visible:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-700">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 focus-visible:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="text-sm text-slate-600">Remember for 30 days</span>
                            </label>
                            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 h-11"
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Google Sign In */}
                    <Button variant="outline" className="w-full" type="button">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Sign in with Google
                    </Button>

                    {/* Footer Link */}
                    <p className="mt-6 text-center text-sm text-slate-600">
                        New to CyberAlign?{" "}
                        <Link href="/sign-up" className="text-blue-600 hover:underline font-medium">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Section - Security Assurance */}
            <div className="hidden lg:flex flex-col justify-center items-center px-12 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.2),transparent_50%)]" />

                {/* Content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative z-10 max-w-lg text-center"
                >
                    {/* Shield Icon with Glow */}
                    <div className="mb-8 relative">
                        <div className="absolute inset-0 blur-3xl bg-blue-500/30 rounded-full" />
                        <div className="relative backdrop-blur-sm bg-white/10 rounded-full p-8 border border-white/20 inline-block">
                            <ShieldCheck className="h-24 w-24 text-blue-300" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Headline */}
                    <h2 className="text-4xl font-bold mb-4">
                        Secure Access
                    </h2>

                    {/* Subtext */}
                    <p className="text-lg text-white/80 leading-relaxed mb-8">
                        Your session is protected by end-to-end encryption and industry-standard security protocols.
                    </p>

                    {/* Security Features */}
                    <div className="grid grid-cols-1 gap-4 mt-12">
                        <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <Lock className="h-5 w-5 text-blue-300" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold">256-bit Encryption</p>
                                    <p className="text-sm text-white/60">Bank-level security</p>
                                </div>
                            </div>
                        </div>

                        <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-violet-500/20 rounded-lg">
                                    <ShieldCheck className="h-5 w-5 text-violet-300" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold">SOC 2 Compliant</p>
                                    <p className="text-sm text-white/60">Certified security standards</p>
                                </div>
                            </div>
                        </div>

                        <div className="backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <ShieldCheck className="h-5 w-5 text-blue-300" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold">Regular Audits</p>
                                    <p className="text-sm text-white/60">Continuous monitoring</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
