"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Shield,
    Search,
    Bell,
    Calendar,
    Plus,
    CheckCircle,
    XCircle,
    AlertTriangle,
    FileText,
    ArrowUpRight,
    Filter,
    Download,
    MoreVertical,
    ShieldAlert,
    Check,
    X,
    Activity,
    AlertCircle,
    Target,
    BarChart3,
    PieChart
} from "lucide-react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Legend,
    Tooltip
} from "recharts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// ==================== MOCK DATA ====================

const mandatoryDocs = [
    { name: "Scope of ISMS", status: true },
    { name: "Information Security Policy", status: true },
    { name: "Risk Assessment Process", status: false }, // BLOCKER
];

const isAuditBlocked = mandatoryDocs.some(doc => !doc.status);

// Radar data with realistic variance for visual interest
const radarData = [
    { subject: "Organizational", score: 45, fullMark: 100 },
    { subject: "People", score: 78, fullMark: 100 },
    { subject: "Physical", score: 34, fullMark: 100 },
    { subject: "Technological", score: 60, fullMark: 100 },
];

const systemicIssues = [
    { issue: "Missing Version Control", count: 5, severity: "High" },
    { issue: "Weak 'Should' Language", count: 12, severity: "Medium" },
    { issue: "Undefined Roles", count: 3, severity: "Critical" },
    { issue: "Incomplete Access Control Matrix", count: 8, severity: "High" },
    { issue: "Missing Approval Signatures", count: 6, severity: "Critical" },
    { issue: "Outdated Policy References", count: 15, severity: "Medium" },
    { issue: "Ambiguous Responsibility Assignment", count: 4, severity: "High" },
    { issue: "No Review Date Specified", count: 9, severity: "Medium" },
];

const recentDocs = [
    { name: "Access_Control_Policy_v2.pdf", category: "Technological", score: 92, date: "Oct 24, 2025" },
    { name: "HR_Security_Policy.pdf", category: "People", score: 58, date: "Oct 23, 2025" },
    { name: "Physical_Entry_Log.xlsx", category: "Physical", score: 88, date: "Oct 22, 2025" },
    { name: "Risk_Assessment_Report.docx", category: "Organizational", score: 45, date: "Oct 21, 2025" },
];

const THEME_COLORS = {
    Organizational: "#003F88",
    People: "#D0006F",
    Physical: "#C084FC",
    Technological: "#F6E05E",
};

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showAllIssues, setShowAllIssues] = useState(false);

    // Show only first 3 issues by default
    const displayedIssues = showAllIssues ? systemicIssues : systemicIssues.slice(0, 3);

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-background">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white dark:bg-card dark:border-border px-6 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
                    <Shield className="h-6 w-6" />
                    <span>CyberAlign</span>
                </div>
                <nav className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <Link href="/dashboard" className="text-blue-600">Dashboard</Link>
                    <Link href="/dashboard/upload" className="hover:text-slate-900 dark:hover:text-slate-50 transition-colors">Documents</Link>
                    <Link href="/dashboard" className="hover:text-slate-900 dark:hover:text-slate-50 transition-colors">Compliance</Link>
                    <Link href="/dashboard/analysis/1" className="hover:text-slate-900 dark:hover:text-slate-50 transition-colors">Reports</Link>
                </nav>
                <div className="ml-auto flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            type="search"
                            placeholder="Search documents..."
                            className="w-64 pl-9 bg-slate-50 border-slate-200 focus:bg-white dark:bg-slate-900 dark:border-slate-800 dark:focus:bg-slate-800 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                    </Button>
                    <Link href="/dashboard/settings/profile">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:opacity-80 transition-opacity">
                            JD
                        </div>
                    </Link>
                </div>
            </header>

            <main className="p-6 max-w-[1600px] mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">Executive Dashboard</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">ISO 27001 Compliance Posture & Audit Readiness</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="bg-white dark:bg-card">
                            <Calendar className="mr-2 h-4 w-4" />
                            Last 30 Days
                        </Button>
                        <Link href="/dashboard/upload">
                            <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                                <Plus className="mr-2 h-4 w-4" />
                                New Audit
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* 1. Audit Readiness Gatekeeper (Hero Widget) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <Card className={`border-l-8 shadow-md ${isAuditBlocked ? 'border-l-red-500 bg-red-50/50' : 'border-l-emerald-500 bg-emerald-50/50'}`}>
                        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* Left: Status Indicator */}
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-full ${isAuditBlocked ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    {isAuditBlocked ? <ShieldAlert className="h-10 w-10" /> : <CheckCircle className="h-10 w-10" />}
                                </div>
                                <div>
                                    <h2 className={`text-2xl font-bold tracking-tight ${isAuditBlocked ? 'text-red-700' : 'text-emerald-700'}`}>
                                        {isAuditBlocked ? "AUDIT BLOCKED" : "AUDIT PROGRESS"}
                                    </h2>
                                    <p className="text-slate-600 font-medium mt-1">
                                        {isAuditBlocked
                                            ? "Mandatory documentation is missing. Audit cannot proceed."
                                            : "All mandatory documents present. Ready for detailed review."}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Checklist */}
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                {mandatoryDocs.map((doc) => (
                                    <div
                                        key={doc.name}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border bg-white dark:bg-card shadow-sm ${doc.status ? 'border-emerald-200 dark:border-emerald-900/50' : 'border-red-200 dark:border-red-900/50'
                                            }`}
                                    >
                                        <div className={`p-1 rounded-full ${doc.status ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                            {doc.status ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                                        </div>
                                        <span className={`text-sm font-semibold ${doc.status ? 'text-slate-700 dark:text-slate-200' : 'text-red-700 dark:text-red-400'}`}>
                                            {doc.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* 2. Global Health Metrics (Grid of 4) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1: Global Compliance Score */}
                    <Card className="shadow-md border-slate-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-900 dark:text-slate-300 uppercase tracking-wider">Global Compliance</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-4">
                            <div className="relative w-32 h-32 group cursor-pointer transition-transform duration-300 hover:scale-110">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="54" stroke="#e2e8f0" strokeWidth="16" fill="transparent" className="dark:stroke-slate-700" />
                                    <circle
                                        cx="64" cy="64" r="54"
                                        stroke="#3b82f6"
                                        strokeWidth="16"
                                        strokeLinecap="round"
                                        strokeDasharray="339.292"
                                        strokeDashoffset={339.292 - (339.292 * 76) / 100}
                                        fill="transparent"
                                        className="drop-shadow-md transition-all duration-500 group-hover:stroke-blue-600 dark:group-hover:stroke-blue-400"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-slate-800 dark:text-slate-100 transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110">76%</span>
                                </div>
                                {/* Tooltip */}
                                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                    <div className="bg-slate-900 dark:bg-slate-700 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                                        Global Compliance Score
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900 dark:bg-slate-700" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 mt-4 font-medium">Passing Score</p>
                        </CardContent>
                    </Card>

                    {/* Card 2: Document Quality Score */}
                    <Card className="shadow-md border-slate-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-900 dark:text-slate-300 uppercase tracking-wider">Document Quality (QA)</CardTitle>
                        </CardHeader>
                        <CardContent className="py-6">
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">4.2</span>
                                <span className="text-sm text-slate-500">/ 5.0</span>
                            </div>
                            <div className="space-y-2 group">
                                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400">
                                    <span>Attribute Completeness</span>
                                    <span className="font-bold">84%</span>
                                </div>
                                {/* Interactive Progress Bar */}
                                <div className="relative">
                                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:h-4 hover:shadow-md">
                                        <div
                                            className="h-full bg-gradient-to-r from-violet-500 to-violet-600 rounded-full transition-all duration-500 hover:from-violet-600 hover:to-violet-700 relative group"
                                            style={{ width: '84%' }}
                                        >
                                            {/* Animated shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                                        </div>
                                    </div>
                                    {/* Tooltip on hover */}
                                    <div className="absolute -top-10 left-[84%] transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                        <div className="bg-slate-900 dark:bg-slate-700 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                                            84% Complete
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900 dark:bg-slate-700" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-4">Based on title, version, date, & signature checks.</p>
                        </CardContent>
                    </Card>

                    {/* Card 3: Language Decisiveness */}
                    <Card className="shadow-md border-slate-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-900 dark:text-slate-300 uppercase tracking-wider">Policy Tone</CardTitle>
                        </CardHeader>
                        <CardContent className="py-6">
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">68%</span>
                                <span className="text-sm text-slate-500">Decisiveness</span>
                            </div>
                            <div className="group">
                                <div className="relative h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-2 cursor-pointer transition-all duration-300 hover:h-7 hover:shadow-md">
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-yellow-400 to-emerald-500 transition-all duration-300 group-hover:from-red-500 group-hover:via-yellow-500 group-hover:to-emerald-600" />
                                    <div className="absolute top-0 bottom-0 w-1 bg-slate-900 dark:bg-slate-100 shadow-sm left-[68%] transition-all duration-300 group-hover:w-1.5" />
                                    {/* Tooltip on hover */}
                                    <div className="absolute -top-12 left-[68%] transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                        <div className="bg-slate-900 dark:bg-slate-700 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                                            68% Decisiveness
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900 dark:bg-slate-700" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs font-medium text-slate-500 transition-colors group-hover:text-slate-700 dark:group-hover:text-slate-300">
                                    <span>Passive</span>
                                    <span>Directive</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 4: Total Critical Gaps */}
                    <Card className="shadow-md border-slate-200 dark:border-border hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                Critical Gaps
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="py-4 flex flex-col items-center">
                            <span className="text-6xl font-bold text-red-600 mb-4">12</span>
                            <Link href="/dashboard/analysis/1" className="w-full">
                                <Button className="w-full bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20">
                                    Fix Now
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* 2.5. Risk Level Insight (NEW) */}
                <Card className="shadow-md border-slate-200 dark:border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-purple-600" />
                            Risk Level Insight (from 93 Annex Controls)
                        </CardTitle>
                        <CardDescription>Distribution of risk levels across all 93 Annex A controls.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            {/* Block 1: Critical */}
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-red-950/30 dark:border-red-900">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-red-100 rounded-lg dark:bg-red-900/50">
                                        <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                                    </div>
                                    <span className="text-5xl font-bold text-red-600 dark:text-red-400">12</span>
                                </div>
                                <p className="text-sm font-semibold text-red-700 dark:text-red-300">Critical Risk</p>
                            </div>

                            {/* Block 2: High */}
                            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-orange-950/30 dark:border-orange-900">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-orange-100 rounded-lg dark:bg-orange-900/50">
                                        <Activity className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <span className="text-5xl font-bold text-orange-600 dark:text-orange-400">25</span>
                                </div>
                                <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">High Risk</p>
                            </div>

                            {/* Block 3: Medium */}
                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-yellow-950/30 dark:border-yellow-900">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-yellow-100 rounded-lg dark:bg-yellow-900/50">
                                        <BarChart3 className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <span className="text-5xl font-bold text-yellow-600 dark:text-yellow-400">30</span>
                                </div>
                                <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Medium Risk</p>
                            </div>

                            {/* Block 4: Low */}
                            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-green-950/30 dark:border-green-900">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-green-100 rounded-lg dark:bg-green-900/50">
                                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <span className="text-5xl font-bold text-green-600 dark:text-green-400">26</span>
                                </div>
                                <p className="text-sm font-semibold text-green-700 dark:text-green-300">Low Risk</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Theme Performance Radar & Systemic Gaps */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Radar Chart */}
                    <Card className="lg:col-span-7 shadow-md border-slate-200 dark:border-border focus:outline-none focus-visible:ring-0">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PieChart className="h-5 w-5 text-blue-600" />
                                Theme Performance
                            </CardTitle>
                            <CardDescription>ISO 27001 Control Categories</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[480px] flex items-center justify-center relative">
                            {/* Clean background */}
                            <div className="absolute inset-0 bg-white dark:bg-slate-950/30 rounded-lg" />

                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="85%" data={radarData} margin={{ top: 30, right: 85, bottom: 30, left: 85 }}>
                                    {/* Grid - Light gray lines like reference */}
                                    <PolarGrid
                                        stroke="#E5E7EB"
                                        strokeWidth={1}
                                        className="dark:stroke-slate-700"
                                    />

                                    {/* AXIS LABELS - Black text for better readability with more spacing */}
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{
                                            fill: '#1F2937',
                                            fontSize: 14,
                                            fontWeight: 600,
                                        }}
                                        className="dark:fill-slate-300"
                                        tickLine={false}
                                    />

                                    <PolarRadiusAxis
                                        angle={90}
                                        domain={[0, 100]}
                                        tick={false}
                                        axisLine={false}
                                        stroke="transparent"
                                    />

                                    {/* Tooltip for interactivity */}
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                            border: '1px solid #E5E7EB',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        }}
                                        labelStyle={{
                                            color: '#1F2937',
                                            fontWeight: 600,
                                            marginBottom: '4px'
                                        }}
                                        itemStyle={{
                                            color: '#3B82F6',
                                            fontWeight: 500
                                        }}
                                        formatter={(value: number) => [`${value}%`, 'Score']}
                                    />

                                    {/* COMPLIANCE SCORE - Without activeDot to prevent covering numbers */}
                                    <Radar
                                        name="Compliance Score"
                                        dataKey="score"
                                        stroke="#3B82F6"
                                        strokeWidth={3}
                                        fill="#93C5FD"
                                        fillOpacity={0.5}
                                        className="dark:stroke-blue-400 dark:fill-blue-400/50"
                                        isAnimationActive={true}
                                        animationDuration={1000}
                                        animationEasing="ease-out"
                                        dot={{
                                            r: 5,
                                            fill: '#3B82F6',
                                            strokeWidth: 2,
                                            stroke: '#fff',
                                        }}
                                        activeDot={false}
                                        label={{
                                            position: 'outside',
                                            fill: '#1F2937',
                                            fontSize: 18,
                                            fontWeight: 700,
                                            offset: 40,
                                            className: 'dark:fill-blue-400'
                                        }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Systemic Gaps */}
                    <Card className="lg:col-span-5 shadow-md border-slate-200 dark:border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-red-500" />
                                Top Systemic Issues
                            </CardTitle>
                            <CardDescription>Frequent errors across documents</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {displayedIssues.map((issue, index) => (
                                    <div key={index} className="p-4 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-start justify-between group hover:bg-slate-200 dark:hover:bg-slate-800 hover:shadow-sm transition-all">
                                        <div>
                                            <h4 className="font-semibold text-slate-800 dark:text-slate-200">{issue.issue}</h4>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Found in {issue.count} documents</p>
                                        </div>
                                        <Badge
                                            className={`${issue.severity === 'Critical' ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400' :
                                                issue.severity === 'High' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400' :
                                                    'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400'
                                                }`}
                                        >
                                            {issue.severity}
                                        </Badge>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    className="w-full mt-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    onClick={() => setShowAllIssues(!showAllIssues)}
                                >
                                    {showAllIssues ? 'Show Less' : `View All Issues (${systemicIssues.length})`}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 4. Recent Analyzed Documents */}
                <Card className="shadow-md border-slate-200 dark:border-border">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Analyzed Documents</CardTitle>
                            <CardDescription>Latest policy scans and health scores</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 dark:bg-secondary/50 text-slate-500 dark:text-slate-400 font-medium border-b dark:border-border">
                                    <tr>
                                        <th className="px-6 py-4">Document Name</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Health Score</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {recentDocs.map((doc) => (
                                        <tr key={doc.name} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors dark:bg-card">
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200 flex items-center gap-3">
                                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                {doc.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant="outline" className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-normal">
                                                    {doc.category}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{doc.date}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Progress
                                                        value={doc.score}
                                                        className="w-24 h-2"
                                                        indicatorClassName={`${doc.score >= 80 ? 'bg-emerald-500' :
                                                            doc.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                                                            }`}
                                                    />
                                                    <span className="font-bold text-slate-700 dark:text-slate-300">{doc.score}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`/dashboard/analysis/1`}>
                                                    <Button size="sm" variant="ghost" className="hover:text-blue-600">
                                                        View Report
                                                        <ArrowUpRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
