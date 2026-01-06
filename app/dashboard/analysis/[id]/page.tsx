"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { toast } from "sonner";
import {
    ArrowLeft,
    Download,
    Sparkles,
    FileText,
    Calendar,
    Clock,
    HardDrive,
    CheckCircle,
    Shield,
    Check,
    X,
    AlertTriangle,
    XCircle,
    Hash,
    PenTool,
    AlertOctagon,
    AlertCircle,
    Info,
    Quote,
    Search,
    Lightbulb,
    Loader2
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// ==================== THEME COLORS (Categorical Palette) ====================
const THEME_COLORS = {
    Organizational: "#003F88", // Deep Sapphire
    People: "#D0006F", // Magenta Punch
    Physical: "#C084FC", // Pink Mauve
    Technological: "#F6E05E", // Pure Gold Yellow
};

const STATUS_COLORS = {
    Compliant: "#10B981", // Emerald-500
    Partial: "#F59E0B", // Amber-500
    "Non-Compliant": "#EF4444", // Red-500
};

// ==================== REAL ISO 27001 CONTROL DATA ====================
const RAW_CONTROLS = [
    // 5. Organizational (37 controls)
    { id: "5.1", name: "Policies for information security" },
    { id: "5.2", name: "Information security roles and responsibilities" },
    { id: "5.3", name: "Segregation of duties" },
    { id: "5.4", name: "Management responsibilities" },
    { id: "5.5", name: "Contact with authorities" },
    { id: "5.6", name: "Contact with special interest groups" },
    { id: "5.7", name: "Threat intelligence" },
    { id: "5.8", name: "Information security in project management" },
    { id: "5.9", name: "Inventory of information and other associated assets" },
    { id: "5.10", name: "Acceptable use of information and other associated assets" },
    { id: "5.11", name: "Return of assets" },
    { id: "5.12", name: "Classification of information" },
    { id: "5.13", name: "Labelling of information" },
    { id: "5.14", name: "Information transfer" },
    { id: "5.15", name: "Access control" },
    { id: "5.16", name: "Identity management" },
    { id: "5.17", name: "Authentication information" },
    { id: "5.18", name: "Access rights" },
    { id: "5.19", name: "Information security in supplier relationships" },
    { id: "5.20", name: "Addressing information security within supplier agreements" },
    { id: "5.21", name: "Managing information security in the ICT supply chain" },
    { id: "5.22", name: "Monitoring, review and change management of supplier services" },
    { id: "5.23", name: "Information security for use of cloud services" },
    { id: "5.24", name: "Information security incident management planning and preparation" },
    { id: "5.25", name: "Assessment and decision on information security events" },
    { id: "5.26", name: "Response to information security incidents" },
    { id: "5.27", name: "Learning from information security incidents" },
    { id: "5.28", name: "Collection of evidence" },
    { id: "5.29", name: "Information security during disruption" },
    { id: "5.30", name: "ICT readiness for business continuity" },
    { id: "5.31", name: "Legal, statutory, regulatory and contractual requirements" },
    { id: "5.32", name: "Intellectual property rights" },
    { id: "5.33", name: "Protection of records" },
    { id: "5.34", name: "Privacy and protection of PII" },
    { id: "5.35", name: "Independent review of information security" },
    { id: "5.36", name: "Compliance with policies and standards" },
    { id: "5.37", name: "Documented operating procedures" },

    // 6. People (8 controls)
    { id: "6.1", name: "Screening" },
    { id: "6.2", name: "Terms and conditions of employment" },
    { id: "6.3", name: "Information security awareness, education and training" },
    { id: "6.4", name: "Disciplinary process" },
    { id: "6.5", name: "Responsibilities after termination or change of employment" },
    { id: "6.6", name: "Confidentiality or non-disclosure agreements" },
    { id: "6.7", name: "Remote working" },
    { id: "6.8", name: "Information security event reporting" },

    // 7. Physical (14 controls)
    { id: "7.1", name: "Physical security perimeters" },
    { id: "7.2", name: "Physical entry" },
    { id: "7.3", name: "Securing offices, rooms and facilities" },
    { id: "7.4", name: "Physical security monitoring" },
    { id: "7.5", name: "Protecting against physical and environmental threats" },
    { id: "7.6", name: "Working in secure areas" },
    { id: "7.7", name: "Clear desk and clear screen policy" },
    { id: "7.8", name: "Equipment siting and protection" },
    { id: "7.9", name: "Security of assets off-premises" },
    { id: "7.10", name: "Storage media" },
    { id: "7.11", name: "Supporting utilities" },
    { id: "7.12", name: "Cabling security" },
    { id: "7.13", name: "Equipment maintenance" },
    { id: "7.14", name: "Secure disposal or re-use of equipment" },

    // 8. Technological (34 controls)
    { id: "8.1", name: "User endpoint devices" },
    { id: "8.2", name: "Privileged access rights" },
    { id: "8.3", name: "Information access restriction" },
    { id: "8.4", name: "Access to source code" },
    { id: "8.5", name: "Secure authentication" },
    { id: "8.6", name: "Capacity management" },
    { id: "8.7", name: "Protection against malware" },
    { id: "8.8", name: "Management of technical vulnerabilities" },
    { id: "8.9", name: "Configuration management" },
    { id: "8.10", name: "Information deletion" },
    { id: "8.11", name: "Data masking" },
    { id: "8.12", name: "Data leakage prevention" },
    { id: "8.13", name: "Information backup" },
    { id: "8.14", name: "Redundancy of information processing facilities" },
    { id: "8.15", name: "Logging" },
    { id: "8.16", name: "Monitoring activities" },
    { id: "8.17", name: "Clock synchronization" },
    { id: "8.18", name: "Use of privileged utility programs" },
    { id: "8.19", name: "Installation of software on operational systems" },
    { id: "8.20", name: "Networks security" },
    { id: "8.21", name: "Security of network services" },
    { id: "8.22", name: "Segregation of networks" },
    { id: "8.23", name: "Web filtering" },
    { id: "8.24", name: "Use of cryptography" },
    { id: "8.25", name: "Secure development life cycle" },
    { id: "8.26", name: "Application security requirements" },
    { id: "8.27", name: "Secure system architecture and engineering principles" },
    { id: "8.28", name: "Secure coding" },
    { id: "8.29", name: "Security testing in development and acceptance" },
    { id: "8.30", name: "Outsourced development" },
    { id: "8.31", name: "Separation of development, test and production environments" },
    { id: "8.32", name: "Change management" },
    { id: "8.33", name: "Test information" },
    { id: "8.34", name: "Protection of information systems during audit testing" },
];

// Helper to distribute statuses
const assignStatuses = () => {
    // We want to ensure Technological has mixed status as requested
    // And overall we want a realistic distribution
    return RAW_CONTROLS.map((control, index) => {
        let status = "Compliant";

        // Force mixed status for Technological (Starts with 8)
        if (control.id.startsWith("8")) {
            if (index % 3 === 0) status = "Non-Compliant";
            else if (index % 3 === 1) status = "Partial";
            else status = "Compliant";
        } else {
            // Other sections mostly compliant but with some gaps
            if (index % 10 === 0) status = "Non-Compliant";
            else if (index % 5 === 0) status = "Partial";
        }

        return { ...control, status };
    });
};

const processedControls = assignStatuses();

const generateControlData = () => {
    const getControlsByPrefix = (prefix: string) => processedControls.filter(c => c.id.startsWith(prefix));

    return [
        {
            name: "Organizational",
            color: THEME_COLORS.Organizational,
            controls: getControlsByPrefix("5")
        },
        {
            name: "People",
            color: THEME_COLORS.People,
            controls: getControlsByPrefix("6")
        },
        {
            name: "Physical",
            color: THEME_COLORS.Physical,
            controls: getControlsByPrefix("7")
        },
        {
            name: "Technological",
            color: THEME_COLORS.Technological,
            controls: getControlsByPrefix("8")
        }
    ];
};

const controlData = generateControlData();

// Generate sunburst data
const sunburstData = {
    name: "ISO 27001",
    color: "#ffffff",
    children: controlData.map(theme => ({
        name: theme.name,
        color: theme.color,
        children: theme.controls.map(control => ({
            id: control.id,
            name: control.name,
            status: control.status,
            value: 1,
            color: STATUS_COLORS[control.status as keyof typeof STATUS_COLORS],
        })),
    })),
};

// Calculate scores
const themeScores = controlData.map(theme => {
    const compliant = theme.controls.filter(c => c.status === "Compliant").length;
    const partial = theme.controls.filter(c => c.status === "Partial").length;
    const nonCompliant = theme.controls.filter(c => c.status === "Non-Compliant").length;
    const points = (compliant * 1) + (partial * 0.5);
    const total = theme.controls.length;
    const percentage = ((points / total) * 100).toFixed(1);

    return {
        name: theme.name,
        color: theme.color,
        compliant,
        partial,
        nonCompliant,
        points,
        total,
        percentage,
    };
});

const totalControls = processedControls.length;
const totalCompliant = processedControls.filter(c => c.status === "Compliant").length;
const totalPartial = processedControls.filter(c => c.status === "Partial").length;
const totalNonCompliant = processedControls.filter(c => c.status === "Non-Compliant").length;
const totalPoints = themeScores.reduce((sum, t) => sum + t.points, 0);
const overallScore = ((totalPoints / totalControls) * 100).toFixed(1);

// Other data - Gatekeeper Logic
const mandatoryDocs = [
    { name: "Scope of ISMS", present: true },
    { name: "Information Security Policy", present: true },
    { name: "Risk Assessment Process", present: false }, // MISSING to trigger CRITICAL
];

const hasMissingDocs = mandatoryDocs.some(doc => !doc.present);

const criticalGaps = [
    "Belum ada Kebijakan Kontrol Akses yang terdokumentasi",
    "Proses Manajemen Risiko belum didefinisikan dengan jelas",
    "Tidak ada bukti pelatihan keamanan untuk karyawan baru"
];

const docAttributes = [
    { name: "Title", present: true },
    { name: "Ref No", present: true },
    { name: "Version", present: false },
    { name: "Date", present: true },
    { name: "Signature", present: false },
];

const attributeScore = ((docAttributes.filter(a => a.present).length / docAttributes.length) * 100).toFixed(0);

const decisiveness = { strong: 45, weak: 23 };
const decisivenessScore = ((decisiveness.strong / (decisiveness.strong + decisiveness.weak)) * 100).toFixed(0);

const detailedGaps = [
    {
        id: 1,
        code: "5.1",
        title: "Policies for information security",
        score: 0.5,
        evidence: "The policy document mentions 'should implement' rather than 'must implement' for critical controls.",
        gap: "Weak language detected. ISO 27001 requires mandatory controls to use directive language.",
        recommendation: "Replace all instances of 'should' with 'shall' or 'must' for mandatory security controls.",
    },
    {
        id: 2,
        code: "8.8",
        title: "Management of technical vulnerabilities",
        score: 0,
        evidence: "No mention of vulnerability management process or patch management timeline.",
        gap: "Complete absence of technical vulnerability management procedures.",
        recommendation: "Add a dedicated section covering: vulnerability scanning frequency, patch management SLA, and responsible parties.",
    },
    {
        id: 3,
        code: "A.9.2",
        title: "User Access Provisioning",
        score: 1.0,
        evidence: "Section 4.1 explicitly states: 'All user access requests must be formally approved by the asset owner via the ticketing system before provisioning.'",
        gap: "No gaps detected. The policy clearly defines the authorization process aligned with ISO 27001 requirements.",
        recommendation: "Maintain the current process. Ensure periodic audit logs review to verify adherence.",
    },
];

export default function AnalysisResultPage() {
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [generatingDoc, setGeneratingDoc] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = () => {
        setIsExporting(true);
        // Mock API call / PDF generation delay
        setTimeout(() => {
            setIsExporting(false);
            toast.success("Report Ready", {
                description: "Access_Control_Policy_Analysis.pdf has been downloaded.",
            });
        }, 2000);
    };

    const handleGenerateDoc = () => {
        setGeneratingDoc(true);
        setTimeout(() => {
            setGeneratingDoc(false);
            toast.success("Compliance Document Generated", {
                description: "A compliant policy document has been created and is ready for download.",
            });
        }, 2500);
    };

    const getReadinessStatus = () => {
        // GATEKEEPER: Check mandatory docs first (highest priority)
        if (hasMissingDocs) {
            return {
                label: "CRITICAL RISK",
                color: "bg-red-600",
                textColor: "text-red-700",
                bgColor: "bg-red-50",
                borderColor: "border-red-500",
                bannerBg: "bg-red-600",
                message: "Dokumen Wajib (Mandatory) belum lengkap. Audit tidak bisa dilakukan.",
                icon: AlertOctagon
            };
        }

        // Score-based thresholds (only if all docs present)
        const score = parseFloat(overallScore);
        if (score >= 95) return {
            label: "READY TO AUDIT",
            color: "bg-green-600",
            textColor: "text-green-700",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            bannerBg: "bg-green-600",
            message: "Excellent compliance posture. All requirements met.",
            icon: CheckCircle
        };
        if (score >= 80) return {
            label: "GOOD",
            color: "bg-blue-600",
            textColor: "text-blue-700",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            bannerBg: "bg-blue-600",
            message: "Minor improvements needed before audit.",
            icon: Shield
        };
        if (score >= 50) return {
            label: "NEEDS IMPROVEMENT",
            color: "bg-yellow-600",
            textColor: "text-yellow-700",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
            bannerBg: "bg-yellow-600",
            message: "Significant gaps identified. Action required.",
            icon: AlertTriangle
        };
        return {
            label: "POOR",
            color: "bg-red-600",
            textColor: "text-red-700",
            bgColor: "bg-red-50",
            borderColor: "border-red-500",
            bannerBg: "bg-red-600",
            message: "Critical improvements required immediately.",
            icon: XCircle
        };
    };

    const readiness = getReadinessStatus();
    const ReadinessIcon = readiness.icon;

    const getCenterText = () => {
        if (!selectedNode || selectedNode.depth === 0) {
            return (
                <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">ISO 27001</p>
                </div>
            );
        }

        // Clicked on Theme (Inner Ring)
        if (selectedNode.depth === 1) {
            const themeName = selectedNode.data.name;
            const themeData = themeScores.find(t => t.name === themeName);

            if (themeData) {
                return (
                    <div className="text-center space-y-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{themeName}</p>
                        <div className="flex flex-col gap-0.5 mt-1">
                            <div className="flex items-center justify-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <p className="text-[10px] text-slate-600">{themeData.compliant} Compliant</p>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                <p className="text-[10px] text-slate-600">{themeData.partial} Partial Compliant</p>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <p className="text-[10px] text-slate-600">{themeData.nonCompliant} Non-Compliant</p>
                            </div>
                        </div>
                    </div>
                );
            }
        }

        // Clicked on Control (Outer Ring)
        if (selectedNode.depth === 2) {
            const statusColor = selectedNode.data.status === "Compliant" ? "bg-green-500" :
                selectedNode.data.status === "Partial" ? "bg-amber-500" : "bg-red-500";

            // Function to wrap text at 29 characters
            const wrapText = (text: string, maxChars: number = 29) => {
                if (text.length <= maxChars) return [text];

                const words = text.split(' ');
                const lines: string[] = [];
                let currentLine = '';

                words.forEach(word => {
                    const testLine = currentLine ? `${currentLine} ${word}` : word;
                    if (testLine.length <= maxChars) {
                        currentLine = testLine;
                    } else {
                        if (currentLine) lines.push(currentLine);
                        currentLine = word;
                    }
                });

                if (currentLine) lines.push(currentLine);
                return lines;
            };

            const textLines = wrapText(selectedNode.data.name);

            return (
                <div className="text-center flex flex-col items-center justify-center h-full px-2">
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">{selectedNode.data.id}</p>
                    <div className="flex items-start justify-center gap-1.5 w-full">
                        <div className={`w-2 h-2 rounded-sm mt-1 flex-shrink-0 ${statusColor}`} />
                        <div className="text-center">
                            {textLines.map((line, index) => (
                                <p key={index} className="text-[10px] font-medium text-slate-600 dark:text-slate-400 leading-tight">
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="text-center">
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">ISO 27001</p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-background dark:to-background p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                ISO 27001 Analysis Report
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">C-Level Audit Cockpit</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="shadow-sm"
                            onClick={handleExport}
                            disabled={isExporting}
                        >
                            {isExporting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Exporting PDF...
                                </>
                            ) : (
                                <>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Report
                                </>
                            )}
                        </Button>
                        <Button
                            onClick={handleGenerateDoc}
                            disabled={generatingDoc}
                            className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                        >
                            {generatingDoc ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="mr-2"
                                    >
                                        <Sparkles className="h-4 w-4" />
                                    </motion.div>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate Compliance Doc
                                </>
                            )}
                        </Button>
                    </div>
                </motion.div>

                {/* Metadata Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card className="shadow-md border-0">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Document</p>
                                            <p className="font-semibold text-slate-900 dark:text-slate-200">Access_Control_Policy_v2.pdf</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-violet-50 rounded-lg">
                                            <Calendar className="h-5 w-5 text-violet-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Scan Date</p>
                                            <p className="font-medium text-slate-700 dark:text-slate-300">Oct 24, 2025, 10:30 AM</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-50 rounded-lg">
                                            <Clock className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Duration</p>
                                            <p className="font-medium text-slate-700 dark:text-slate-300">2.1s</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-amber-50 rounded-lg">
                                            <HardDrive className="h-5 w-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">File Size</p>
                                            <p className="font-medium text-slate-700 dark:text-slate-300">1.2 MB</p>
                                        </div>
                                    </div>
                                </div>
                                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 text-sm shadow-lg">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Scan Complete
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Executive Summary Dashboard */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Column A: Compliance Scores */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="col-span-4"
                    >
                        <Card className="shadow-xl border-0 h-full">
                            <CardHeader>
                                <CardTitle>Compliance Scores</CardTitle>
                                <CardDescription>Calculated scoring logic</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                {/* Overall Score - Circular Progress with Hover */}
                                <div className="flex flex-col items-center justify-center">
                                    <motion.div
                                        className="relative w-48 h-48 cursor-pointer"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="80"
                                                stroke="#f1f5f9"
                                                strokeWidth="16"
                                                fill="transparent"
                                            />
                                            <motion.circle
                                                initial={{ strokeDasharray: "502 502", strokeDashoffset: 502 }}
                                                animate={{ strokeDashoffset: 502 - (502 * parseFloat(overallScore)) / 100 }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                cx="96"
                                                cy="96"
                                                r="80"
                                                stroke="#6366f1"
                                                strokeWidth="16"
                                                strokeLinecap="round"
                                                fill="transparent"
                                                className="drop-shadow-lg hover:drop-shadow-2xl transition-all"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">{overallScore}%</span>
                                            <span className="text-xs text-slate-500 uppercase tracking-wider">Overall Score</span>
                                        </div>
                                    </motion.div>
                                    <div className="mt-4 text-center">
                                        <p className="text-slate-500 font-medium">{totalPoints} / {totalControls} points</p>
                                    </div>
                                </div>

                                {/* Theme Progress Bars - Interactive Focus Mode */}
                                <div className="space-y-6 group">
                                    {themeScores.map((theme, index) => (
                                        <motion.div
                                            key={theme.name}
                                            className="cursor-pointer transition-all"
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => console.log('scrollToSection', theme.name.toLowerCase())}
                                        >
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">{theme.name}</span>
                                                <span className="text-slate-500">{theme.points}/{theme.total}</span>
                                            </div>
                                            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden group-hover:[&:not(:hover)]:opacity-40 hover:opacity-100 transition-opacity">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${theme.percentage}%` }}
                                                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                                    className="h-full rounded-full shadow-sm"
                                                    style={{ backgroundColor: theme.color }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Column B: Sunburst Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="col-span-4"
                    >
                        <Card className="shadow-xl border-0 h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-blue-600" />
                                    ISO 27001 Structure
                                </CardTitle>
                                <CardDescription>Interactive control distribution</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <style dangerouslySetInnerHTML={{
                                    __html: `
                                    svg[role="img"] path {
                                        transition: filter 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
                                        cursor: pointer !important;
                                        will-change: transform, filter;
                                        transform-origin: center center !important;
                                        transform-box: fill-box !important;
                                    }
                                    svg[role="img"] path:hover {
                                        filter: brightness(1.25) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3)) !important;
                                        transform: scale(1.1) !important;
                                        z-index: 100 !important;
                                        position: relative !important;
                                    }
                                    /* Extra emphasis for small outer segments */
                                    svg[role="img"] g:last-child path:hover {
                                        transform: scale(1.15) !important;
                                        filter: brightness(1.3) drop-shadow(0 3px 10px rgba(0, 0, 0, 0.4)) !important;
                                    }
                                `}} />
                                <div className="relative h-[420px]">
                                    <ResponsiveSunburst
                                        data={sunburstData}
                                        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                                        id="name"
                                        value="value"
                                        innerRadius={0.15}
                                        cornerRadius={2}
                                        borderWidth={2}
                                        borderColor="rgba(255,255,255,0.15)"
                                        colors={(node) => {
                                            // STRICT COLOR MAPPING
                                            if (node.depth === 1) {
                                                // Inner Ring: Themes
                                                return THEME_COLORS[node.data.name as keyof typeof THEME_COLORS] || "#cbd5e1";
                                            }
                                            if (node.depth === 2) {
                                                // Outer Ring: Controls - FORCE STATUS COLOR
                                                const status = node.data.status;
                                                if (status === "Compliant") return STATUS_COLORS.Compliant;
                                                if (status === "Partial") return STATUS_COLORS.Partial;
                                                if (status === "Non-Compliant") return STATUS_COLORS["Non-Compliant"];
                                                return "#cbd5e1"; // Fallback
                                            }
                                            return "white"; // Root
                                        }}
                                        inheritColorFromParent={false}
                                        enableArcLabels={false}
                                        onClick={(node) => setSelectedNode(node)}
                                        onMouseEnter={(node) => {
                                            // Additional hover effect
                                            console.log('Hovering:', node.data.name);
                                        }}
                                        animate={true}
                                        motionConfig="gentle"
                                        // Simple hover effects - no flickering
                                        arcOpacity={0.9}
                                        arcHoverOpacity={1}
                                        arcHoverOthersOpacity={0.4}
                                        transitionMode="startAngle"
                                        tooltip={({ id, value, color, data }) => (
                                            <div className="bg-white dark:bg-slate-900 px-3 py-2 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
                                                    <div>
                                                        <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                                                            {data.id || data.name}
                                                        </p>
                                                        {data.status && (
                                                            <p className="text-[10px] text-slate-600 dark:text-slate-400">{data.status}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        theme={{
                                            tooltip: {
                                                container: {
                                                    background: 'transparent',
                                                    padding: 0,
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                }
                                            }
                                        }}
                                    />

                                    {/* Center Text - Clean Floating Style */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        {getCenterText()}
                                    </div>
                                </div>

                                {/* Legend - Compact */}
                                <div className="flex flex-wrap justify-center gap-6 mt-6">
                                    {/* Compliant */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">Compliant</span>
                                        <span className="text-xl font-bold text-slate-900 dark:text-slate-100 ml-1">{totalCompliant}</span>
                                    </div>

                                    {/* Partial */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">Partial Compliant</span>
                                        <span className="text-xl font-bold text-slate-900 dark:text-slate-100 ml-1">{totalPartial}</span>
                                    </div>

                                    {/* Non-Compliant */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">Non-Compliant</span>
                                        <span className="text-xl font-bold text-slate-900 dark:text-slate-100 ml-1">{totalNonCompliant}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Column C: Audit Readiness - Strict Gatekeeper Logic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="col-span-4"
                    >
                        <Card className="shadow-xl border-0 h-full overflow-hidden">
                            {/* Status Banner Header */}
                            <div className={`${readiness.bannerBg} p-6 relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent" />
                                <div className="relative z-10 flex items-center gap-4">
                                    <motion.div
                                        className="p-3 bg-white/20 backdrop-blur-sm rounded-xl"
                                        animate={hasMissingDocs ? {
                                            scale: [1, 1.1, 1],
                                        } : {}}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatType: "loop"
                                        }}
                                    >
                                        <ReadinessIcon className="h-8 w-8 text-white" />
                                    </motion.div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white tracking-tight">
                                            {readiness.label}
                                        </h3>
                                        <p className="text-sm text-white/90 mt-1">
                                            {readiness.message}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-6 space-y-6">
                                {/* Section: Mandatory Documents (Gatekeeper) */}
                                <div>
                                    <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-blue-600" />
                                        Mandatory Documents (Gatekeeper)
                                    </h4>
                                    <ul className="space-y-3">
                                        {mandatoryDocs.map((doc, index) => (
                                            <motion.li
                                                key={doc.name}
                                                className={`group flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${doc.present
                                                    ? 'bg-green-50 border-green-200 hover:bg-green-100'
                                                    : 'bg-red-50 border-red-300 shadow-sm hover:bg-red-100'
                                                    }`}
                                                whileHover={{ scale: 1.01 }}
                                            >
                                                <div className="flex-shrink-0 mt-0.5">
                                                    {doc.present ? (
                                                        <div className="p-1 bg-green-500 rounded-full">
                                                            <Check className="h-4 w-4 text-white" />
                                                        </div>
                                                    ) : (
                                                        <div className="p-1 bg-red-500 rounded-full">
                                                            <X className="h-4 w-4 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-sm font-semibold ${doc.present ? 'text-slate-700' : 'text-red-700'
                                                        }`}>
                                                        {index + 1}. {doc.name}
                                                    </p>
                                                    {!doc.present && (
                                                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                                                            <AlertCircle className="h-3 w-3" />
                                                            Dokumen ini wajib untuk audit
                                                        </p>
                                                    )}
                                                </div>
                                                {!doc.present && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs border-red-300 text-red-600 hover:bg-red-50"
                                                    >
                                                        Upload
                                                    </Button>
                                                )}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Separator */}
                                <div className="border-t border-slate-200" />

                                {/* Section: Top 3 Critical Gaps */}
                                <div>
                                    <h4 className="text-sm font-bold text-red-600 mb-4 uppercase tracking-wide flex items-center gap-2">
                                        <AlertTriangle className="h-4 w-4" />
                                        Top 3 Critical Gaps
                                    </h4>
                                    <ul className="space-y-3">
                                        {criticalGaps.map((gap, index) => (
                                            <TooltipProvider key={index}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <motion.li
                                                            className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200 cursor-pointer transition-all hover:bg-amber-100"
                                                            whileHover={{ x: 4 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <div className="flex-shrink-0 mt-0.5">
                                                                <div className="p-1 bg-amber-500 rounded-full">
                                                                    <AlertCircle className="h-3 w-3 text-white" />
                                                                </div>
                                                            </div>
                                                            <p className="text-xs text-slate-700 leading-relaxed truncate">
                                                                {gap}
                                                            </p>
                                                        </motion.li>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="right" className="max-w-xs">
                                                        <p className="text-xs">{gap}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Risk Level Insight (NEW) - From Dashboard */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                >
                    <Card className="shadow-lg border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-purple-600" />
                                Risk Level Insight (from 93 Annex Controls)
                            </CardTitle>
                            <CardDescription>Distribution of risk levels across all 93 Annex A controls.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                {/* Block 1: Critical */}
                                <motion.div
                                    className="bg-red-50 border-2 border-red-200 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-red-950/30 dark:border-red-900"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-red-100 rounded-lg dark:bg-red-900/50">
                                            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                                        </div>
                                        <span className="text-5xl font-bold text-red-600 dark:text-red-400">12</span>
                                    </div>
                                    <p className="text-sm font-semibold text-red-700 dark:text-red-300">Critical Risk</p>
                                </motion.div>

                                {/* Block 2: High */}
                                <motion.div
                                    className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-orange-950/30 dark:border-orange-900"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-orange-100 rounded-lg dark:bg-orange-900/50">
                                            <AlertCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <span className="text-5xl font-bold text-orange-600 dark:text-orange-400">25</span>
                                    </div>
                                    <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">High Risk</p>
                                </motion.div>

                                {/* Block 3: Medium */}
                                <motion.div
                                    className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-yellow-950/30 dark:border-yellow-900"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-yellow-100 rounded-lg dark:bg-yellow-900/50">
                                            <Info className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                                        </div>
                                        <span className="text-5xl font-bold text-yellow-600 dark:text-yellow-400">30</span>
                                    </div>
                                    <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Medium Risk</p>
                                </motion.div>

                                {/* Block 4: Low */}
                                <motion.div
                                    className="bg-green-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 dark:bg-green-950/30 dark:border-green-900"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-green-100 rounded-lg dark:bg-green-900/50">
                                            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-5xl font-bold text-green-600 dark:text-green-400">26</span>
                                    </div>
                                    <p className="text-sm font-semibold text-green-700 dark:text-green-300">Low Risk</p>
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* QA Cards Row */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Document Attributes - Interactive Chips */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Card className="shadow-lg border-0 h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>Attribute Completeness</span>
                                    <Badge variant="secondary" className="text-lg font-bold bg-slate-100 text-slate-700">
                                        {attributeScore}%
                                    </Badge>
                                </CardTitle>
                                <CardDescription>Quality of document metadata based on ISO standards</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <TooltipProvider>
                                    <div className="flex flex-wrap gap-4">
                                        {docAttributes.map((attr) => {
                                            const tooltipMessages = {
                                                "Title": attr.present
                                                    ? "Document title clearly identified"
                                                    : "Missing document title in header section",
                                                "Ref No": attr.present
                                                    ? "Reference number properly assigned"
                                                    : "Missing reference number (e.g., DOC-001)",
                                                "Version": attr.present
                                                    ? "Version control implemented correctly"
                                                    : "Missing document version number (e.g., v1.0) in header or footer",
                                                "Date": attr.present
                                                    ? "Document date clearly stated"
                                                    : "Missing creation or revision date",
                                                "Signature": attr.present
                                                    ? "Authorization signature present"
                                                    : "Missing approval signature or electronic signature"
                                            };

                                            return (
                                                <Tooltip key={attr.name}>
                                                    <TooltipTrigger asChild>
                                                        <div
                                                            className={`
                                                                flex items-center gap-3 px-4 py-3 rounded-xl border-2 bg-white
                                                                cursor-pointer transition-all duration-200
                                                                hover:-translate-y-1 hover:shadow-md
                                                                ${attr.present ? 'border-emerald-200 hover:border-emerald-300' : 'border-red-200 hover:border-red-300'}
                                                            `}
                                                        >
                                                            <div className={`p-2 rounded-full ${attr.present ? 'bg-emerald-50' : 'bg-red-50'}`}>
                                                                {attr.present ? (
                                                                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                                                                ) : (
                                                                    <XCircle className="h-5 w-5 text-red-500" />
                                                                )}
                                                            </div>
                                                            <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                                                                {attr.name}
                                                            </span>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-[200px]">
                                                        <p className="text-xs">{tooltipMessages[attr.name as keyof typeof tooltipMessages]}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            );
                                        })}
                                    </div>
                                </TooltipProvider>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Decisiveness - Gradient Gauge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Card className="shadow-lg border-0 h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span>Decisiveness Score</span>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-4 w-4 text-slate-400 cursor-help" />
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-xs">
                                                    <p className="text-xs">Measures the ratio of directive language (Must/Shall) vs. passive language (Should/May).</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Badge variant="secondary" className="text-lg font-bold bg-slate-100 text-slate-700">
                                        {decisivenessScore}%
                                    </Badge>
                                </CardTitle>
                                <CardDescription>Strength of policy language</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {/* Smart Meter Gauge with Hover */}
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <motion.div
                                                    className="relative h-10 w-full bg-slate-100 rounded-full overflow-hidden cursor-pointer"
                                                    whileHover={{ scale: 1.02 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-yellow-400 to-emerald-500 opacity-90" />
                                                    {/* Animated Marker - Black */}
                                                    <motion.div
                                                        initial={{ left: '0%' }}
                                                        animate={{ left: `${decisivenessScore}%` }}
                                                        transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
                                                        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-12 bg-slate-900 shadow-sm transform -translate-x-1/2"
                                                    />
                                                </motion.div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="text-xs font-semibold">Your Tone Score: {decisivenessScore}%</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <div className="flex justify-between items-center px-4">
                                        <motion.div
                                            className="text-center group cursor-pointer"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <p className="text-2xl font-bold text-red-600 group-hover:drop-shadow-lg transition-all">{decisiveness.weak}</p>
                                            <p className="text-xs text-slate-500 uppercase font-semibold">Weak Words</p>
                                        </motion.div>
                                        <motion.div
                                            className="text-center group cursor-pointer"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <p className="text-2xl font-bold text-emerald-600 group-hover:drop-shadow-lg transition-all">{decisiveness.strong}</p>
                                            <p className="text-xs text-slate-500 uppercase font-semibold">Strong Words</p>
                                        </motion.div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Detailed Gap Analysis */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <Card className="shadow-xl border-0">
                        <CardHeader>
                            <CardTitle>Detailed Gap Analysis</CardTitle>
                            <CardDescription>Specific findings and recommendations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="multiple" className="w-full">
                                {detailedGaps.map((gap) => (
                                    <AccordionItem key={gap.id} value={`item-${gap.id}`} className="border-b border-slate-100">
                                        <AccordionTrigger className="hover:no-underline py-4 group">
                                            <div className="flex items-center gap-4 w-full">
                                                <Badge
                                                    variant="outline"
                                                    className="bg-slate-100 text-slate-700 border-slate-200 font-mono"
                                                >
                                                    {gap.code}
                                                </Badge>
                                                <span className="flex-1 text-left font-semibold">{gap.title}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-slate-500">Score:</span>
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${gap.score === 1
                                                        ? 'bg-green-100 text-green-700'
                                                        : gap.score === 0.5
                                                            ? 'bg-amber-100 text-amber-700'
                                                            : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {gap.score}
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-4 pt-4">
                                            {/* Evidence Block - Quote Style */}
                                            <div className="bg-slate-50 dark:bg-slate-900/50 border-l-4 border-slate-300 dark:border-slate-600 p-4 rounded-r-lg relative">
                                                <Quote className="h-4 w-4 text-slate-400 absolute top-4 left-4" />
                                                <div className="pl-6">
                                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Evidence</h4>
                                                    <p className="text-sm text-slate-700 font-mono italic leading-relaxed">
                                                        "{gap.evidence}"
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Gap Analysis Block */}
                                            <div className="p-4 bg-white dark:bg-slate-900/50 rounded-lg">
                                                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                                                    <Search className="h-4 w-4 text-slate-600" />
                                                    Gap Analysis
                                                </h4>
                                                <p className="text-sm text-slate-600 leading-relaxed">{gap.gap}</p>
                                            </div>

                                            {/* Recommendation Block - Action Box */}
                                            <div className="bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg p-4">
                                                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                                                    <Lightbulb className="h-4 w-4 text-blue-600" />
                                                    Recommendation
                                                </h4>
                                                <p className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed">{gap.recommendation}</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
