"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, Lock, User, Shield, CheckCircle } from "lucide-react";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);

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
        setPassword(value);
        const strength = calculatePasswordStrength(value);
        setPasswordStrength(strength);
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 40) return "bg-red-500";
        if (passwordStrength < 70) return "bg-yellow-500";
        return "bg-green-500";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement registration
        window.location.href = "/dashboard";
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
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
                            Create an account
                        </h2>
                        <p className="text-slate-500">
                            Start aligning your security policies today.
                        </p>
                    </div>

                    {/* Social Auth */}
                    <Button variant="outline" className="w-full mb-6" type="button">
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
                        Sign up with Google
                    </Button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-500">Or continue with email</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Work Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700">
                                Work Email
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

                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-slate-700">
                                Full Name
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    onChange={(e) => handlePasswordChange(e.target.value)}
                                    className="pl-10 focus-visible:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Password Strength Meter */}
                            {password && (
                                <div className="space-y-1">
                                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                            style={{ width: `${passwordStrength}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        {passwordStrength < 40 && "Weak password"}
                                        {passwordStrength >= 40 && passwordStrength < 70 && "Medium password"}
                                        {passwordStrength >= 70 && "Strong password"}
                                    </p>
                                </div>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 h-11"
                        >
                            Create Account
                        </Button>
                    </form>

                    {/* Footer Link */}
                    <p className="mt-6 text-center text-sm text-slate-600">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="text-blue-600 hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Section - Visuals/Trust */}
            <div className="hidden lg:flex flex-col justify-center items-center px-12 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.2),transparent_50%)]" />

                {/* Glassmorphism Card */}
                <div className="relative z-10 max-w-lg">
                    <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl mb-8">
                        {/* Mock Compliance Score */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-sm text-blue-200 mb-1">Compliance Score</p>
                                <p className="text-4xl font-bold">87%</p>
                            </div>
                            <div className="p-3 bg-blue-500/20 rounded-full">
                                <Shield className="h-8 w-8 text-blue-300" />
                            </div>
                        </div>

                        {/* Mock Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-lg p-3">
                                <p className="text-xs text-blue-200 mb-1">Documents</p>
                                <p className="text-2xl font-semibold">24</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                                <p className="text-xs text-blue-200 mb-1">Frameworks</p>
                                <p className="text-2xl font-semibold">3</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <CheckCircle key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <blockquote className="text-2xl font-serif leading-relaxed">
                                "The fastest way to get audit-ready. CyberAlign changed how we handle compliance."
                            </blockquote>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-semibold">
                                JD
                            </div>
                            <div>
                                <p className="font-semibold">John Doe</p>
                                <p className="text-sm text-blue-200">CISO at TechCorp</p>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <p className="text-sm text-blue-200 mb-4">Trusted by security teams at</p>
                        <div className="flex gap-6 opacity-60">
                            <div className="text-lg font-bold">TechCorp</div>
                            <div className="text-lg font-bold">SecureInc</div>
                            <div className="text-lg font-bold">DataSafe</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
