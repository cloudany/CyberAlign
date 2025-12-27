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
    Legend
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

const radarData = [
    { subject: "Organizational", score: 85, fullMark: 100 },
    { subject: "People", score: 62, fullMark: 100 }, // Lagging
    { subject: "Physical", score: 78, fullMark: 100 },
    { subject: "Technological", score: 92, fullMark: 100 },
];

const systemicIssues = [
    { issue: "Missing Version Control", count: 5, severity: "High" },
    { issue: "Weak 'Should' Language", count: 12, severity: "Medium" },
    { issue: "Undefined Roles", count: 3, severity: "Critical" },
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

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
                    <Shield className="h-6 w-6" />
                    <span>CyberAlign</span>
                </div>
                <nav className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium text-slate-600">
                    <Link href="/dashboard" className="text-blue-600">Dashboard</Link>
                    <Link href="/dashboard/upload" className="hover:text-slate-900 transition-colors">Documents</Link>
                    <Link href="/dashboard" className="hover:text-slate-900 transition-colors">Compliance</Link>
                    <Link href="/dashboard/analysis/1" className="hover:text-slate-900 transition-colors">Reports</Link>
                </nav>
                <div className="ml-auto flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            type="search"
                            placeholder="Search documents..."
                            className="w-64 pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5 text-slate-600" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                    </Button>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs cursor-pointer">
                        JD
                    </div>
                </div>
            </header>

            <main className="p-6 max-w-[1600px] mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Executive Dashboard</h1>
                        <p className="text-slate-500 mt-1">ISO 27001 Compliance Posture & Audit Readiness</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="bg-white">
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
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border bg-white shadow-sm ${doc.status ? 'border-emerald-200' : 'border-red-200'
                                            }`}
                                    >
                                        <div className={`p-1 rounded-full ${doc.status ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                            {doc.status ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                                        </div>
                                        <span className={`text-sm font-semibold ${doc.status ? 'text-slate-700' : 'text-red-700'}`}>
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
                            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Global Compliance</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-4">
                            <div className="relative w-32 h-32">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="64" cy="64" r="54" stroke="#e2e8f0" strokeWidth="16" fill="transparent" />
                                    <circle
                                        cx="64" cy="64" r="54"
                                        stroke="#3b82f6"
                                        strokeWidth="16"
                                        strokeLinecap="round"
                                        strokeDasharray="339.292"
                                        strokeDashoffset={339.292 - (339.292 * 76) / 100}
                                        fill="transparent"
                                        className="drop-shadow-md"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-slate-800">76%</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 mt-4 font-medium">Passing Score</p>
                        </CardContent>
                    </Card>

                    {/* Card 2: Document Quality Score */}
                    <Card className="shadow-md border-slate-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Document Quality (QA)</CardTitle>
                        </CardHeader>
                        <CardContent className="py-6">
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-4xl font-bold text-slate-800">4.2</span>
                                <span className="text-sm text-slate-500">/ 5.0</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium text-slate-600">
                                    <span>Attribute Completeness</span>
                                    <span>84%</span>
                                </div>
                                <Progress value={84} className="h-3 bg-slate-100" indicatorClassName="bg-violet-500" />
                            </div>
                            <p className="text-xs text-slate-500 mt-4">Based on title, version, date, & signature checks.</p>
                        </CardContent>
                    </Card>

                    {/* Card 3: Language Decisiveness */}
                    <Card className="shadow-md border-slate-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Policy Tone</CardTitle>
                        </CardHeader>
                        <CardContent className="py-6">
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-4xl font-bold text-slate-800">68%</span>
                                <span className="text-sm text-slate-500">Decisiveness</span>
                            </div>
                            <div className="relative h-6 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-yellow-400 to-emerald-500" />
                                <div className="absolute top-0 bottom-0 w-1 bg-slate-900 shadow-sm left-[68%]" />
                            </div>
                            <div className="flex justify-between text-xs font-medium text-slate-500">
                                <span>Passive</span>
                                <span>Directive</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 4: Total Critical Gaps */}
                    <Card className="shadow-md border-slate-200 hover:shadow-lg transition-shadow bg-red-50/30 border-red-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-red-600 uppercase tracking-wider flex items-center gap-2">
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

                {/* 3. Theme Performance Radar & Systemic Gaps */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Radar Chart */}
                    <Card className="lg:col-span-7 shadow-md border-slate-200">
                        <CardHeader>
                            <CardTitle>Theme Performance</CardTitle>
                            <CardDescription>ISO 27001 Control Categories</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#e2e8f0" strokeWidth={2} />
                                    <PolarAngleAxis
                                        dataKey="subject"
                                        tick={{ fill: '#475569', fontSize: 14, fontWeight: 600 }}
                                    />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Compliance Score"
                                        dataKey="score"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fill="#3b82f6"
                                        fillOpacity={0.3}
                                    />
                                    <Legend />
                                </RadarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Systemic Gaps */}
                    <Card className="lg:col-span-5 shadow-md border-slate-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-red-500" />
                                Top Systemic Issues
                            </CardTitle>
                            <CardDescription>Frequent errors across documents</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {systemicIssues.map((issue, index) => (
                                    <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-start justify-between group hover:bg-white hover:shadow-sm transition-all">
                                        <div>
                                            <h4 className="font-semibold text-slate-800">{issue.issue}</h4>
                                            <p className="text-sm text-slate-500 mt-1">Found in {issue.count} documents</p>
                                        </div>
                                        <Badge
                                            className={`${issue.severity === 'Critical' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                                                issue.severity === 'High' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                                                    'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                                }`}
                                        >
                                            {issue.severity}
                                        </Badge>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full mt-2 text-slate-600">
                                    View All Issues
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 4. Recent Analyzed Documents */}
                <Card className="shadow-md border-slate-200">
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
                                <thead className="bg-slate-50 text-slate-500 font-medium border-b">
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
                                        <tr key={doc.name} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                {doc.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant="outline" className="bg-slate-50 text-slate-600 font-normal">
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
                                                    <span className="font-bold text-slate-700">{doc.score}%</span>
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
