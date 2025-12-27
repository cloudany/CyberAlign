"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    UploadCloud,
    FileText,
    X,
    CheckCircle,
    Loader2,
    ArrowLeft,
    Upload,
} from "lucide-react";
import Link from "next/link";

type ProcessingStep = {
    id: number;
    label: string;
    status: "pending" | "processing" | "complete";
};

export default function UploadPage() {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [documentTitle, setDocumentTitle] = useState("");
    const [documentCategory, setDocumentCategory] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingProgress, setProcessingProgress] = useState(0);
    const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([
        { id: 1, label: "Parsing document structure and extracting content...", status: "pending" },
        { id: 2, label: "Analyzing policy controls with AI model...", status: "pending" },
        { id: 3, label: "Mapping against ISO 27001, NIST CSF & CIS Controls...", status: "pending" },
        { id: 4, label: "Generating compliance score and gap analysis...", status: "pending" },
    ]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setSelectedFile(file);
            // Auto-fill document title with filename (without extension)
            const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
            setDocumentTitle(nameWithoutExt);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
            "text/plain": [".txt"],
        },
        maxSize: 10 * 1024 * 1024, // 10MB
        multiple: false,
    });

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setDocumentTitle("");
    };

    const handleStartAnalysis = async () => {
        if (!selectedFile || !documentCategory) return;

        setIsProcessing(true);
        setProcessingProgress(0);

        // Simulate processing steps
        const stepDuration = 1000; // 1 second per step
        const steps = [...processingSteps];

        for (let i = 0; i < steps.length; i++) {
            // Mark current step as processing
            steps[i].status = "processing";
            setProcessingSteps([...steps]);

            // Simulate processing time
            await new Promise((resolve) => setTimeout(resolve, stepDuration));

            // Mark current step as complete
            steps[i].status = "complete";
            setProcessingSteps([...steps]);

            // Update progress
            const progress = ((i + 1) / steps.length) * 100;
            setProcessingProgress(progress);
        }

        // Wait a bit before redirecting
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Redirect to analysis page
        router.push("/dashboard/analysis/1");
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                        CyberAlign
                    </h1>
                </div>
                <nav className="space-y-2">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition"
                    >
                        Dashboard
                    </Link>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
                        <Upload className="w-5 h-5" />
                        Upload Policy
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="ml-64">
                <header className="bg-white border-b border-slate-200 px-8 py-4">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                </header>

                <main className="p-8 flex items-center justify-center min-h-[calc(100vh-73px)]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl"
                    >
                        <AnimatePresence mode="wait">
                            {!isProcessing ? (
                                <motion.div
                                    key="upload-form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="mb-6">
                                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                                            Upload Policy Document
                                        </h1>
                                        <p className="text-slate-600">
                                            Upload your compliance policy document for AI-powered analysis
                                        </p>
                                    </div>

                                    <Card className="shadow-lg">
                                        <CardHeader>
                                            <CardTitle>Document Upload</CardTitle>
                                            <CardDescription>
                                                Supported formats: PDF, DOCX, TXT (Max size: 10MB)
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {/* Dropzone */}
                                            {!selectedFile ? (
                                                <div
                                                    {...getRootProps()}
                                                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${isDragActive
                                                        ? "border-blue-500 bg-blue-50"
                                                        : "border-slate-300 hover:border-slate-400 bg-white"
                                                        }`}
                                                >
                                                    <input {...getInputProps()} />
                                                    <UploadCloud
                                                        className={`w-16 h-16 mx-auto mb-4 transition-colors ${isDragActive ? "text-blue-500" : "text-slate-400"
                                                            }`}
                                                    />
                                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                                        {isDragActive
                                                            ? "Drop your file here"
                                                            : "Drag and drop your file here"}
                                                    </h3>
                                                    <p className="text-slate-600 mb-4">or</p>
                                                    <Button variant="outline" type="button">
                                                        Browse Files
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {/* File Card */}
                                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                                            <FileText className="w-6 h-6 text-blue-600" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-slate-900 truncate">
                                                                {selectedFile.name}
                                                            </p>
                                                            <p className="text-sm text-slate-500">
                                                                {formatFileSize(selectedFile.size)}
                                                            </p>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={handleRemoveFile}
                                                            className="flex-shrink-0"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>

                                                    {/* Document Title Input */}
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-slate-900">
                                                            Document Title
                                                        </label>
                                                        <Input
                                                            value={documentTitle}
                                                            onChange={(e) => setDocumentTitle(e.target.value)}
                                                            placeholder="Enter document title"
                                                            className="w-full"
                                                        />
                                                    </div>

                                                    {/* Document Category Select */}
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-slate-900">
                                                            Document Category
                                                        </label>
                                                        <Select
                                                            value={documentCategory}
                                                            onValueChange={setDocumentCategory}
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select a category" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="policy">Policy</SelectItem>
                                                                <SelectItem value="procedure">Procedure</SelectItem>
                                                                <SelectItem value="standard">Standard</SelectItem>
                                                                <SelectItem value="guideline">Guideline</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    {/* Start Analysis Button */}
                                                    <Button
                                                        onClick={handleStartAnalysis}
                                                        disabled={!documentTitle || !documentCategory}
                                                        className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-700 hover:to-violet-700"
                                                        size="lg"
                                                    >
                                                        Start AI Analysis
                                                    </Button>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="processing-view"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                >
                                    <Card className="shadow-lg">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                                                Processing Document
                                            </CardTitle>
                                            <CardDescription>
                                                Please wait while we analyze your document
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {/* Progress Bar */}
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-slate-600">Overall Progress</span>
                                                    <span className="font-medium text-blue-600">
                                                        {Math.round(processingProgress)}%
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={processingProgress}
                                                    className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-blue-600 [&>div]:to-violet-600"
                                                />
                                            </div>

                                            {/* Processing Steps */}
                                            <div className="space-y-3">
                                                {processingSteps.map((step) => (
                                                    <motion.div
                                                        key={step.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: (step.id - 1) * 0.1 }}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            {step.status === "complete" ? (
                                                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                                            ) : step.status === "processing" ? (
                                                                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                                                            ) : (
                                                                <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                                                            )}
                                                        </div>
                                                        <p
                                                            className={`text-sm ${step.status === "complete"
                                                                ? "text-slate-900 font-medium"
                                                                : step.status === "processing"
                                                                    ? "text-blue-600 font-medium"
                                                                    : "text-slate-500"
                                                                }`}
                                                        >
                                                            {step.label}
                                                        </p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
