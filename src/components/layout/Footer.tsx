"use client";

import Link from "next/link";
import { Heart, ArrowUp, ShieldCheck, Mail, Phone, MapPin, ExternalLink, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from "@/components/SocialIcons";
import { portfolioConfig } from "@/config/portfolioConfig";
import { BsWhatsapp } from "react-icons/bs";

const dev = portfolioConfig.developer;
const navLinks = portfolioConfig.navigation;
const projects = portfolioConfig.projects;

const socialMap = [
  { name: "GitHub", url: dev.github, icon: GithubIcon, hoverColor: "hover:text-slate-900 dark:hover:text-white hover:border-slate-400/60" },
  { name: "LinkedIn", url: dev.linkedin, icon: LinkedinIcon, hoverColor: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40" },
  { name: "Instagram", url: dev.instagram, icon: InstagramIcon, hoverColor: "hover:text-[#E1306C] hover:border-[#E1306C]/40" },
  { name: "Facebook", url: dev.facebook, icon: FacebookIcon, hoverColor: "hover:text-[#1877F2] hover:border-[#1877F2]/40" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const featuredApps = projects.filter((p) => p.featured || p.live);

  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-gradient-to-b from-transparent via-purple-950/5 to-purple-950/25 pt-16 pb-8 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* ── Brand & Bio Column ── */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex  items-center gap-2.5">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-tr flex items-center justify-center text-white text-xs font-black shadow-md group-hover:scale-110 group-hover:shadow-purple-500/40 transition-all duration-300">
                <img src="/Logo.ico" alt="Arman Rakib" className="h-full w-full rounded-xl" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white block leading-none">
                  {dev.name}
                </span>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-1 block">
                  {dev.role}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed font-medium">
              {dev.title} with {dev.experienceYears} years of experience architecting scalable multi-tenant SaaS platforms, workflow automation engines, and cloud data pipelines.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> All Systems Operational • 99.98% Uptime
              </span>
            </div>
          </div>

          {/* ── Navigation Index Column ── */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              Navigation Index
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-bold">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors py-1 flex items-center gap-1.5 group"
                >
                  <span className="h-1 w-1 rounded-full bg-purple-500/40 group-hover:bg-purple-500 group-hover:scale-125 transition-all" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Featured Apps Quick Links Column ── */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Featured Apps
            </h4>
            <div className="space-y-2 text-xs sm:text-sm font-bold">
              {featuredApps.map((proj) => (
                <a
                  key={proj.title}
                  href={proj.live || proj.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors py-1 flex items-center justify-between group"
                >
                  <span className="truncate max-w-[130px]">{proj.title.split("—")[0]}</span>
                  <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Social Channels & Direct Contact Column ── */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Connect Across Web
            </h4>

            <div className="flex items-center gap-2">
              {socialMap.map(({ name, url, icon: Icon, hoverColor }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-white/70 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 transition-all hover:scale-110 shadow-sm ${hoverColor}`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>

            <div className="text-xs font-bold text-slate-600 dark:text-slate-400 space-y-1.5 pt-2">
              <a
                href={`mailto:${dev.email}`}
                className="flex items-center gap-1.5 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-purple-500" /> {dev.email}
              </a>
              <a
                href={`https://wa.me/${dev.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <BsWhatsapp className="h-3.5 w-3.5 text-emerald-500" />{`+${dev.whatsapp.replace(/[^0-9]/g, "")}`}
              </a>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar & Scroll to Top ── */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left font-medium">
            © {new Date().getFullYear()} {dev.name}. Designed & Engineered with{" "}
            <Heart className="inline h-3.5 w-3.5 text-rose-500 fill-rose-500" /> using Next.js 16 & TypeScript.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-bold text-purple-600 dark:text-purple-300 hover:bg-purple-500/20 transition-all shadow-sm group"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
