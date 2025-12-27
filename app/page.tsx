"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Shield,
  Zap,
  FileText,
  Lock,
  Upload,
  Sparkles,
  CheckCircle,
  Brain,
  BarChart3,
  FileCheck,
  Download,
  Wand2,
  Rocket,
  Building2,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            CyberAlign
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition">
              How it Works
            </a>
            <a href="#solutions" className="text-slate-600 hover:text-slate-900 transition">
              Solutions
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-violet-50 to-white min-h-screen snap-start">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Achieve Perfect Security Alignment
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
              Upload your policies and let AI instantly benchmark them against Cybersecurity regulations & standards
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:scale-105 transition-transform text-lg px-8 py-6"
                >
                  Start Aligning <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl blur-3xl opacity-20" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-white rounded-xl border-2 border-slate-200 shadow-2xl overflow-hidden"
                style={{ transform: "perspective(1000px) rotateX(5deg)" }}
              >
                <div className="bg-gradient-to-r from-slate-100 to-slate-50 p-3 border-b border-slate-200 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="p-8 bg-gradient-to-br from-slate-50 to-white">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <div className="text-sm text-slate-500 mb-1">Compliance Score</div>
                      <div className="text-3xl font-bold text-blue-600">87%</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <div className="text-sm text-slate-500 mb-1">Critical Gaps</div>
                      <div className="text-3xl font-bold text-red-600">12</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                      <div className="text-sm text-slate-500 mb-1">Documents</div>
                      <div className="text-3xl font-bold text-violet-600">24</div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <div className="h-32 bg-gradient-to-r from-blue-100 to-violet-100 rounded-lg" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-500 mb-8 text-sm uppercase tracking-wider">
            Trusted Compliance Standards
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 hover:opacity-100 transition-opacity">
            {["ISO 27001", "NIST CSF", "CIS Controls", "SOC 2", "GDPR"].map((standard) => (
              <motion.div
                key={standard}
                whileHover={{ scale: 1.1, opacity: 1 }}
                className="text-2xl font-bold text-slate-700"
              >
                {standard}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section id="features" className="py-24 bg-slate-50 min-h-screen snap-start">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Powerful Features for Modern Security Teams
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to achieve and maintain compliance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 - AI-Powered Gap Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 hover:border-blue-500 transition-all hover:shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-white h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50" />
                <Brain className="w-12 h-12 text-blue-600 mb-4 relative z-10" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">
                  AI-Powered Gap Analysis
                </h3>
                <p className="text-slate-600 mb-6 flex-grow relative z-10">
                  Our LLM understands context, not just keywords. Get intelligent recommendations
                  that actually make sense for your organization.
                </p>
                <div className="mt-auto p-4 bg-blue-50 rounded-lg border border-blue-200 relative z-10">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600 mt-1" />
                    <div className="text-sm text-slate-700">
                      <strong>Example:</strong> "Missing MFA for admin accounts detected in Section 9.4.2"
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Feature 2 - Audit-Ready Reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 hover:border-violet-500 transition-all hover:shadow-lg border-2 border-violet-200 bg-gradient-to-br from-violet-50/50 to-white h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100 rounded-full blur-3xl opacity-50" />
                <FileCheck className="w-12 h-12 text-violet-600 mb-4 relative z-10" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">Audit-Ready Reports</h3>
                <p className="text-slate-600 mb-6 flex-grow relative z-10">
                  Generate comprehensive compliance reports instantly. Turn complex gap analysis into executive summaries and technical action plans.
                </p>
                <div className="mt-auto bg-violet-50 rounded-lg p-3 border border-violet-200 relative z-10">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-red-600" />
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-slate-900">ISO27001_Gap_Analysis.pdf</p>
                      <p className="text-xs text-slate-500">2.4 MB</p>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Download className="w-3 h-3" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Feature 3 - Instant Policy Remediation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-8 hover:border-green-500 transition-all hover:shadow-lg border-2 border-green-200 bg-gradient-to-br from-green-50/50 to-white h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-50" />
                <Wand2 className="w-12 h-12 text-green-600 mb-4 relative z-10" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">
                  Instant Policy Remediation
                </h3>
                <p className="text-slate-600 mb-6 flex-grow relative z-10">
                  Turn analysis into action. Our AI generates new, compliant policy drafts to close specific gaps found in your uploaded documents.
                </p>
                <div className="mt-auto space-y-3 relative z-10">
                  <motion.div
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="p-3 bg-red-50 border-2 border-red-300 rounded-lg"
                  >
                    <p className="text-sm font-medium text-red-700">Gap Found: Missing ISO A.5.1</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                    className="p-3 bg-green-50 border-2 border-green-300 rounded-lg"
                  >
                    <p className="text-sm font-medium text-green-700">Generated Clause: Access Control Policy...</p>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white min-h-screen snap-start">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Compliance in 3 Simple Steps
            </h2>
            <p className="text-xl text-slate-600">From upload to actionable insights in minutes</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-violet-200 to-green-200" />

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-6 shadow-lg">
                <Upload className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">1. Upload Policy</h3>
              <p className="text-slate-600">
                Drag and drop your policy documents. We support PDF, DOCX, and more.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 text-white mb-6 shadow-lg"
              >
                <Sparkles className="w-10 h-10" />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">2. AI Scanning</h3>
              <p className="text-slate-600">
                Our AI analyzes your document against compliance frameworks in real-time.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">3. Get Actionable Fixes</h3>
              <p className="text-slate-600">
                Receive detailed gap analysis with specific recommendations to close compliance gaps.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions for Every Stage Section */}
      <section id="solutions" className="py-24 bg-slate-50 min-h-screen snap-start">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Solutions for Every Stage
            </h2>
            <p className="text-xl text-slate-600">
              Whether you're building your first ISMS or scaling a global security program
            </p>
          </motion.div>

          <Tabs defaultValue="startups" className="w-full">
            <TabsList className="mx-auto flex w-fit bg-slate-100 p-1 rounded-full mb-8">
              <TabsTrigger
                value="startups"
                className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                Startups
              </TabsTrigger>
              <TabsTrigger
                value="enterprises"
                className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                Enterprises
              </TabsTrigger>
              <TabsTrigger
                value="consultants"
                className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
              >
                Consultants
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Startups */}
            <TabsContent value="startups">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200 shadow-sm rounded-2xl p-12"
              >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      Build Your First Security Program
                    </h3>
                    <p className="text-lg text-slate-600 mb-6">
                      Don't let compliance block your sales deals. Generate compliant policies from scratch and get audit-ready faster.
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                      Start for Startups <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-30" />
                      <Rocket className="w-48 h-48 text-blue-600 relative z-10" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Tab 2: Enterprises */}
            <TabsContent value="enterprises">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200 shadow-sm rounded-2xl p-12"
              >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      Orchestrate Global Compliance
                    </h3>
                    <p className="text-lg text-slate-600 mb-6">
                      Unified visibility across ISO, NIST, and CIS. Detect drift in real-time across all your documents and frameworks.
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                      Scale Security <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-violet-200 rounded-full blur-3xl opacity-30" />
                      <Building2 className="w-48 h-48 text-violet-600 relative z-10" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Tab 3: Consultants */}
            <TabsContent value="consultants">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200 shadow-sm rounded-2xl p-12"
              >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      Accelerate Client Audits
                    </h3>
                    <p className="text-lg text-slate-600 mb-6">
                      The ultimate tool for vCISOs. Map client documents to standards in minutes and deliver professional reports instantly.
                    </p>
                    <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                      Partner with Us <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-30" />
                      <Briefcase className="w-48 h-48 text-green-600 relative z-10" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Secure Your Organization?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Let us handle the heavy lifting of policy review, so you can focus on security
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
              >
                Get Started Now <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="/pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="/security" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-white transition">About</a></li>
                <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
                <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/docs" className="hover:text-white transition">Documentation</a></li>
                <li><a href="/api" className="hover:text-white transition">API</a></li>
                <li><a href="/support" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:text-white transition">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white transition">Terms</a></li>
                <li><a href="#compliance" className="hover:text-white transition">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center">
            <p>© 2025 CyberAlign. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
