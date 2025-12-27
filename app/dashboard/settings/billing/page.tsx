"use client";

import { useState } from "react";
import {
    CreditCard,
    CheckCircle,
    Download,
    Zap,
    AlertCircle,
    Calendar
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

// Mock billing history data
const billingHistory = [
    {
        id: 1,
        date: "Nov 01, 2025",
        amount: "$49.00",
        status: "Paid",
        invoiceUrl: "#",
    },
    {
        id: 2,
        date: "Oct 01, 2025",
        amount: "$49.00",
        status: "Paid",
        invoiceUrl: "#",
    },
    {
        id: 3,
        date: "Sep 01, 2025",
        amount: "$49.00",
        status: "Paid",
        invoiceUrl: "#",
    },
    {
        id: 4,
        date: "Aug 01, 2025",
        amount: "$49.00",
        status: "Paid",
        invoiceUrl: "#",
    },
];

export default function BillingSettingsPage() {
    const [isUpgrading, setIsUpgrading] = useState(false);

    // Usage data
    const documentsUsage = {
        current: 34,
        limit: 50,
        percentage: 68,
    };

    const aiFixesUsage = {
        current: 12,
        limit: 20,
        percentage: 60,
    };

    const handleUpgradePlan = () => {
        setIsUpgrading(true);
        setTimeout(() => {
            setIsUpgrading(false);
            toast.success("Redirecting to upgrade page...");
        }, 1000);
    };

    const handleCancelSubscription = () => {
        toast.error("Cancel Subscription", {
            description: "Please contact support to cancel your subscription.",
        });
    };

    const handleUpdateCard = () => {
        toast.success("Redirecting to payment update...");
    };

    const handleDownloadInvoice = (invoiceId: number) => {
        toast.success("Invoice Downloaded", {
            description: `Invoice #${invoiceId} has been downloaded.`,
        });
    };

    const getUsageColor = (percentage: number) => {
        if (percentage >= 90) return "bg-red-500";
        if (percentage >= 75) return "bg-amber-500";
        return "bg-blue-600";
    };

    return (
        <div className="space-y-6">
            {/* Current Plan Card (Hero) */}
            <Card className="shadow-sm hover:shadow-md transition-shadow bg-gradient-to-r from-blue-50 to-violet-50 border-blue-200">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-blue-600" />
                                <CardTitle className="text-2xl">Pro Plan</CardTitle>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-900">$49</span>
                                <span className="text-slate-600">/month</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
                                <Calendar className="h-4 w-4" />
                                <span>Your plan renews on November 24, 2025</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button
                                onClick={handleUpgradePlan}
                                disabled={isUpgrading}
                                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:scale-105 transition-transform"
                            >
                                {isUpgrading ? "Loading..." : "Upgrade Plan"}
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={handleCancelSubscription}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                Cancel Subscription
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Usage & Limits Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle>Usage this month</CardTitle>
                    <CardDescription>
                        Track your monthly usage and limits for your current plan.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Documents Analysis */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-700">Documents Analyzed</span>
                            <span className="text-slate-600">
                                {documentsUsage.current}/{documentsUsage.limit}
                            </span>
                        </div>
                        <div className="relative">
                            <Progress
                                value={documentsUsage.percentage}
                                className={`h-2 [&>div]:${getUsageColor(documentsUsage.percentage)}`}
                            />
                        </div>
                        {documentsUsage.percentage >= 90 && (
                            <div className="flex items-center gap-2 text-xs text-amber-600">
                                <AlertCircle className="h-3 w-3" />
                                <span>You're approaching your monthly limit</span>
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* AI Policy Generations */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-700">AI Fixes Generated</span>
                            <span className="text-slate-600">
                                {aiFixesUsage.current}/{aiFixesUsage.limit}
                            </span>
                        </div>
                        <div className="relative">
                            <Progress
                                value={aiFixesUsage.percentage}
                                className="h-2 [&>div]:bg-violet-600"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <p className="text-sm text-slate-600">
                            Need more? <button onClick={handleUpgradePlan} className="text-blue-600 hover:underline font-medium">Upgrade your plan</button> for unlimited access.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Payment Method Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>
                        Manage your payment information.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-100 rounded-lg">
                                <CreditCard className="h-6 w-6 text-slate-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">•••• •••• •••• 4242</p>
                                <p className="text-sm text-slate-500">Expires 04/2026</p>
                            </div>
                        </div>
                        <Button variant="outline" onClick={handleUpdateCard}>
                            Update Card
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Billing History Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                        View and download your past invoices.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Invoice</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {billingHistory.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.date}</TableCell>
                                    <TableCell className="font-semibold">{invoice.amount}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className="border-green-200 text-green-700 bg-green-50"
                                        >
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            {invoice.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDownloadInvoice(invoice.id)}
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            <Download className="h-4 w-4 mr-1" />
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Zap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-blue-900">Need help with billing?</h4>
                        <p className="text-sm text-blue-700 mt-1">
                            Contact our support team at <a href="mailto:billing@cyberalign.com" className="underline font-medium">billing@cyberalign.com</a> or visit our help center.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
