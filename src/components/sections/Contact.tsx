"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Send, Loader2, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { ToastNotification } from "@/components/common/ToastNotification";
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from "@/components/SocialIcons";

import { portfolioConfig } from "@/config/portfolioConfig";

const dev = portfolioConfig.developer;

const socialLinks = [
  {
    name: "LinkedIn",
    url: dev.linkedin,
    icon: LinkedinIcon,
    color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40",
  },
  {
    name: "GitHub",
    url: dev.github,
    icon: GithubIcon,
    color: "hover:text-slate-900 dark:hover:text-white hover:border-slate-400/60",
  },
  {
    name: "Instagram",
    url: dev.instagram,
    icon: InstagramIcon,
    color: "hover:text-[#E1306C] hover:border-[#E1306C]/40",
  },
  {
    name: "Facebook",
    url: dev.facebook,
    icon: FacebookIcon,
    color: "hover:text-[#1877F2] hover:border-[#1877F2]/40",
  },
];

const contactMethods = [
  {
    icon: Mail,
    label: "Email Me",
    value: dev.email,
    href: `mailto:${dev.email}`,
    style: "btn-primary",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: dev.whatsapp,
    href: `https://wa.me/${dev.whatsapp.replace(/[^0-9]/g, "")}`,
    style: "whatsapp",
  },
  {
    icon: Phone,
    label: "Call Me",
    value: dev.phone,
    href: `tel:${dev.phone.replace(/[^0-9+]/g, "")}`,
    style: "outline",
  },
];

const SUBJECT_OPTIONS = portfolioConfig.contactOptions.subjectOptions;
const MAX_DAILY_REFINEMENTS = portfolioConfig.aiChat.maxDailyRefinements;

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Multi-Tenant SaaS & E-Commerce Platform",
    customSubject: "",
    requirements: "",
    budget: "$5k - $15k",
  });

  const [status, setStatus] = useState<{
    submitting: boolean;
    success: boolean | null;
    message: string;
  }>({
    submitting: false,
    success: null,
    message: "",
  });

  const [isRefining, setIsRefining] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [aiProvider, setAiProvider] = useState<"gemini" | "groq">("gemini");
  const [refinementCountToday, setRefinementCountToday] = useState(0);

  const getRefineTodayCookieKey = () => {
    const d = new Date();
    return `refine_req_${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    const key = getRefineTodayCookieKey();
    const count = Cookies.get(key);
    setRefinementCountToday(count ? parseInt(count, 10) : 0);
  }, []);

  // Trigger floating toast when status message changes
  useEffect(() => {
    if (status.message && status.success !== null) {
      setShowToast(true);
    }
  }, [status.message, status.success]);

  const handleRefineRequirements = async () => {
    if (!formData.requirements.trim() || isRefining) return;

    const key = getRefineTodayCookieKey();
    const currentCount = parseInt(Cookies.get(key) || "0", 10);

    if (currentCount >= MAX_DAILY_REFINEMENTS) {
      setStatus({
        submitting: false,
        success: false,
        message: "Daily free AI refinement limit reached (5/5 for today). You can submit your requirements as is!",
      });
      return;
    }

    setIsRefining(true);

    const finalSubject =
      formData.subject === "Custom Subject (Specify Below)"
        ? formData.customSubject || "Custom Inquiry"
        : formData.subject;

    try {
      const res = await fetch("/api/refine-requirements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          draftRequirements: formData.requirements,
          subject: finalSubject,
          budget: formData.budget,
          provider: aiProvider,
        }),
      });
      const data = await res.json();
      if (data.refinedRequirements) {
        setFormData((prev) => ({ ...prev, requirements: data.refinedRequirements }));
        const newCount = currentCount + 1;
        Cookies.set(key, String(newCount), { expires: 1, sameSite: "lax" });
        setRefinementCountToday(newCount);
      }
    } catch (err) {
      console.error("Refinement error:", err);
    } finally {
      setIsRefining(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: null, message: "" });

    const finalSubject =
      formData.subject === "Custom Subject (Specify Below)"
        ? formData.customSubject || "Custom Inquiry"
        : formData.subject;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: finalSubject,
          requirements: formData.requirements,
          budget: formData.budget,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          submitting: false,
          success: true,
          message: "Thank you! Your requirements have been received. A confirmation email has been dispatched to your inbox.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "Multi-Tenant SaaS & E-Commerce Platform",
          customSubject: "",
          requirements: "",
          budget: "$5k - $15k",
        });
      } else {
        setStatus({
          submitting: false,
          success: false,
          message: data.error || "Failed to process your request. Please check your details and try again.",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        submitting: false,
        success: false,
        message: "Network connection error. Please try emailing directly at armanrakib61@gmail.com.",
      });
    }
  };

  const remainingRefinements = Math.max(0, MAX_DAILY_REFINEMENTS - refinementCountToday);

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-20 relative">
      {/* ── Reusable Toast Notification Component ── */}
      <ToastNotification
        show={showToast}
        type={status.success ? "success" : "error"}
        title={status.success ? "Inquiry Submitted Successfully!" : "Submission Alert"}
        message={status.message}
        onClose={() => setShowToast(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65 }}
      >
        {/* Label */}
        <div className="mb-3 flex items-center justify-center gap-2">
          <span className="section-num text-base">07.</span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] hover:text-black text-slate-400 dark:text-slate-500">
            Get In Touch
          </span>
        </div>

        <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Let&apos;s Build Something <span className="gradient-text">Exceptional</span>
        </h2>

        <p className="mx-auto mb-12 max-w-xl text-center text-base text-slate-600 dark:text-slate-400">
          I build scalable, reliable, and production-ready software across backend systems, cloud infrastructure, distributed architecture, and AI.
        </p>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Direct Contact Channels
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Reach out directly via email, WhatsApp, or phone. I typically respond within a few hours.
              </p>

              <div className="space-y-3.5">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-between p-4 rounded-2xl border border-[var(--border)] bg-white/50 dark:bg-white/[0.03] hover:border-purple-500/40 hover:bg-purple-500/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            {method.label}
                          </div>
                          <div className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                            {method.value}
                          </div>
                        </div>
                      </div>
                      <Send className="h-4 w-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                    </a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-[var(--border)]">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Connect Across Web
                </div>
                <div className="flex items-center gap-3">
                  {socialLinks.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        className={`flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white/50 dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 transition-all hover:scale-110 shadow-sm ${s.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Requirements Submission Form */}
          <div className="lg:col-span-7 h-full">
            <div className="glass-raised p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-12">
                Connect with me
              </h3>
              
              

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-[var(--border)] bg-white/70 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-[var(--border)] bg-white/70 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Subject & Budget Row */}
                <div className="">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Subject / Expertise Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-[var(--border)] bg-white/70 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    >
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    {/* Conditional Input for Custom Subject */}
                    {formData.subject === "Custom Subject (Specify Below)" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2.5"
                      >
                        <input
                          type="text"
                          required
                          placeholder="Enter your custom subject..."
                          value={formData.customSubject}
                          onChange={(e) => setFormData({ ...formData, customSubject: e.target.value })}
                          className="w-full rounded-xl border border-purple-500/40 bg-purple-500/5 px-4 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full rounded-xl border border-[var(--border)] bg-white/70 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    >
                      <option value="<$1k">&lt; $1,000 (Consultation / Audit)</option>
                      <option value="$1k - $5k">$1,000 - $5,000</option>
                      <option value="$5k - $15k">$5,000 - $15,000</option>
                      <option value="$15k+">$15,000+ (Full System / Enterprise)</option>
                    </select>
                  </div> */}


                </div>

                {/* Requirements & Message */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Message *
                    </label>

                    <div className="flex items-center gap-2">
                      {/* AI Provider & Model Selector */}
                      {/* <select
                        value={aiProvider}
                        onChange={(e) => setAiProvider(e.target.value as "gemini" | "groq")}
                        className="text-[11px] font-bold rounded-lg border border-purple-500/30 bg-purple-500/10 px-2 py-1 text-purple-600 dark:text-purple-300 focus:outline-none"
                      >
                        <option value="gemini" className="bg-slate-900 text-white">Google Gemini 1.5</option>
                        <option value="groq" className="bg-slate-900 text-white">Groq Llama 3.3 (70B)</option>
                      </select> */}

                      {/* AI Refine Button */}


                      {/* <button
                        type="button"
                        onClick={handleRefineRequirements}
                        disabled={!formData.requirements.trim() || isRefining || remainingRefinements <= 0}
                        className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 disabled:opacity-40 transition-colors"
                        title="Polishes & formats draft requirements into professional specification using your chosen AI model"
                      >
                        {isRefining ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Refining...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                            Refine ({remainingRefinements}/5 left)
                          </>
                        )}
                      </button> */}
                    </div>
                  </div>

                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, technical challenge, or opportunity..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full h-36 rounded-xl border border-[var(--border)] bg-white/70 dark:bg-slate-950/50 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="btn-primary w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  {status.submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Dispatching Requirements...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message & Requirements
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
