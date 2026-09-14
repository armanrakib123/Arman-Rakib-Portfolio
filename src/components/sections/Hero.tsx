"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, FileText, ArrowDown, Play, Pause, Cpu, Layers, Sparkles, X, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";

const ResumeModal = dynamic(
  () => import("./ResumeModal").then((mod) => mod.ResumeModal),
  { ssr: false }
);
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { SiLeetcode } from "react-icons/si";

import { portfolioConfig } from "@/config/portfolioConfig";

const FLOAT_BADGES = portfolioConfig.hero.floatingBadges;
const STATS = portfolioConfig.hero.stats;
const TECH_VIDEO_STREAMS = portfolioConfig.hero.techStreams;

export function Hero() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStreamIdx, setActiveStreamIdx] = useState(0);

  return (
    <>
      <section id="hero" className="scroll-mt-20 py-4 sm:py-6">
        <div className="glass-raised p-6 sm:p-10 lg:p-14 xl:p-16 relative overflow-hidden">
          {/* Inner radial tint */}
          <div className="absolute inset-0 rounded-[1.5rem] pointer-events-none
            bg-[radial-gradient(ellipse_70%_60%_at_0%_0%,rgba(124,58,237,0.10),transparent_60%),
               radial-gradient(ellipse_50%_50%_at_100%_100%,rgba(59,130,246,0.08),transparent_60%)]"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* ── Left column ── */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              {/* Status badge */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-50 dark:border-emerald-500/25 dark:bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Available for new opportunities
                </motion.div>

                {/* Tech Reel Video Showcase Badge */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 text-xs font-bold text-purple-600 dark:text-purple-300 hover:bg-purple-500/20 transition-all shadow-sm group"
                >
                  <Play className="h-3.5 w-3.5 text-purple-500 fill-purple-500 group-hover:scale-110 transition-transform" />
                  Tech Stack Reel
                </button>
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                Hi, I&apos;m{" "}
                <span className="gradient-text">Arman</span>
                <br />
                <span className="text-slate-700 dark:text-slate-200">Rakib</span>
              </h1>

              {/* Role */}
              <p className="mt-4 text-lg font-semibold text-purple-600 dark:text-purple-400 tracking-wide sm:text-xl flex items-center justify-center lg:justify-start gap-2">
                Software Engineer & Backend Developer
                <Sparkles className="h-4 w-4 text-amber-400" />
              </p>

              {/* Tagline */}
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
                Software Engineer focused on building scalable systems, distributed backends, cloud-native applications, and AI-powered solutions.
              </p>

              {/* CTA buttons */}
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link href="#contact" className="btn-primary">
                  <Mail className="h-4 w-4" />
                  Get In Touch
                </Link>
                <button
                  onClick={() => setIsResumeModalOpen(true)}
                  className="btn-outline"
                >
                  <FileText className="h-4 w-4" />
                  View Resume
                </button>
              </div>

              {/* Social quick links */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://github.com/armanrakib123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
                <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
                <a
                  href="https://www.linkedin.com/in/arman-rakib-9b4792317/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href="https://leetcode.com/u/ARMANRAKIB/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <SiLeetcode className="w-4 h-4" />
                  LeetCode
                </a>
              </div>

              {/* Stats */}
              <div className="mt-8 grid w-full max-w-xs grid-cols-3 gap-3 rounded-2xl border border-[var(--border)] bg-white/50 dark:bg-white/[0.04] p-4 sm:max-w-sm">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-extrabold gradient-text sm:text-3xl">{value}</div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll hint */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-8 hidden items-center gap-2 text-xs text-slate-400 dark:text-slate-600 lg:flex"
              >
                <ArrowDown className="h-3.5 w-3.5" />
                Scroll to explore
              </motion.div>
            </motion.div>

            {/* ── Right column — avatar & animated floating elements ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="relative flex justify-center py-6"
            >
              <div className="relative flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96 lg:h-[440px] lg:w-[440px]">
                {/* Glowing radial ambient glow behind avatar */}
                <div
                  className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-600/30 via-violet-500/25 to-cyan-500/30 blur-3xl pointer-events-none"
                  style={{ animation: "pulse 6s ease-in-out infinite" }}
                />

                {/* Outer Orbit Ring 1 - Counter Clockwise */}
                <div
                  className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/35 dark:border-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                  style={{ animation: "spin-slow 24s linear infinite reverse" }}
                >
                  <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-purple-400 shadow-[0_0_12px_#a855f7]" />
                  <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
                </div>

                {/* Middle Orbit Ring 2 - Clockwise */}
                <div
                  className="absolute inset-6 rounded-full border-2 border-dashed border-cyan-500/30 dark:border-cyan-400/25 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                  style={{ animation: "spin-slow 16s linear infinite" }}
                >
                  <span className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_12px_#60a5fa]" />
                  <span className="absolute top-1/2 -left-1.5 h-3 w-3 -translate-y-1/2 rounded-full bg-rose-400 shadow-[0_0_12px_#fb7185]" />
                </div>

                {/* Inner Glowing Accent Ring */}
                <div
                  className="absolute inset-12 rounded-full border border-purple-400/20 dark:border-purple-500/20"
                  style={{ animation: "spin-slow 30s linear infinite" }}
                />

                {/* Pulsing Neon Aura */}
                <div
                  className="absolute inset-14 rounded-full bg-gradient-to-tr from-purple-500/15 via-indigo-500/10 to-cyan-500/15 blur-xl"
                  style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
                />

                {/* Avatar Frame with Gradient Border & Glow */}
                <div className="relative z-10 h-56 w-56 sm:h-72 sm:w-72 lg:h-84 lg:w-84 group">
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 p-[3.5px] shadow-[0_0_35px_rgba(168,85,247,0.4)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(168,85,247,0.6)]">
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-950">
                      <Image
                        src="/rakib.png"
                        alt="Arman Rakib — Software Engineer & Backend Developer"
                        fill
                        sizes="(max-width: 640px) 14rem, (max-width: 1024px) 18rem, 22rem"
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Animated Floating Skill Badges */}
                {FLOAT_BADGES.map(({ label, color, border, text, top, left, delay }) => (
                  <motion.div
                    key={label}
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay,
                    }}
                    whileHover={{ scale: 1.12, rotate: [-1, 1, 0] }}
                    className={`absolute ${top} ${left} z-20 cursor-pointer`}
                  >
                    <div
                      className={`flex items-center gap-2 rounded-full border ${border} bg-gradient-to-r ${color}
                        backdrop-blur-xl px-4 py-2 text-xs sm:text-sm font-bold ${text}
                        shadow-[0_8px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.4)]
                        dark:bg-slate-950/80 transition-all duration-300 hover:shadow-lg`}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                      </span>
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resume Modal */}
      {isResumeModalOpen && (
        <ResumeModal onClose={() => setIsResumeModalOpen(false)} />
      )}

      {/* ── Interactive Technology Stack Video Showcase Modal ── */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-raised w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-purple-500/30 bg-slate-950"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                      Technology Stack Video Reel
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        4K 60FPS
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">Interactive Technical Architecture Stream</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Video Reel Display Canvas Area */}
              <div className="relative h-72 sm:h-96 w-full bg-slate-950 flex flex-col justify-between p-6 sm:p-8 overflow-hidden">
                {/* Background Tech Stream Animation */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${TECH_VIDEO_STREAMS[activeStreamIdx].color} opacity-15 blur-2xl transition-all duration-700 pointer-events-none`}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                      LIVE ARCHITECTURE STREAM
                    </span>
                  </div>

                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                    {TECH_VIDEO_STREAMS[activeStreamIdx].speed}
                  </span>
                </div>

                {/* Active Tech Video Card Info */}
                <div className="relative z-10 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {TECH_VIDEO_STREAMS[activeStreamIdx].tag}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white gradient-text">
                    {TECH_VIDEO_STREAMS[activeStreamIdx].name}
                  </h2>
                  <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                    Designed for high-throughput enterprise performance, multi-tenant RBAC security, and scalable cloud deployment.
                  </p>
                </div>

                {/* Player Controls Bar */}
                <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors shadow-lg"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? "Pause Stream" : "Play Stream"}
                  </button>

                  {/* Channel Stream Selectors */}
                  <div className="flex items-center gap-2">
                    {TECH_VIDEO_STREAMS.map((s, idx) => (
                      <button
                        key={s.name}
                        onClick={() => setActiveStreamIdx(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${activeStreamIdx === idx ? "w-8 bg-purple-500" : "w-2.5 bg-slate-700 hover:bg-slate-500"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
