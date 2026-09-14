"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, Lock, Globe, ChevronLeft, ChevronRight, LayoutGrid, Sliders } from "lucide-react";
import { useState, useEffect } from "react";
import { GithubIcon } from "@/components/SocialIcons";
import { portfolioConfig } from "@/config/portfolioConfig";

const projects = portfolioConfig.projects;

export function Projects() {
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play slider in slider mode
  useEffect(() => {
    if (viewMode !== "slider") return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [viewMode]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const activeProject = projects[currentIndex];

  return (
    <section id="projects" className="scroll-mt-24 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65 }}
      >
        {/* Header with Slider / Grid Toggle */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="section-num text-base">04.</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Featured Work
            </span>
          </div>

          {/* View Mode Toggle Controls */}
          <div className="flex items-center gap-1 rounded-full border border-[var(--border)] bg-white/80 dark:bg-white/[0.05] p-1 backdrop-blur-md shadow-sm">
            <button
              onClick={() => setViewMode("slider")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                viewMode === "slider"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              Slider View
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Grid View
            </button>
          </div>
        </div>

        <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Featured <span className="gradient-text">Projects & Systems</span>
        </h2>

        {/* ── Slider Mode ── */}
        {viewMode === "slider" ? (
          <div className="relative glass p-6 sm:p-10 lg:p-12 rounded-3xl min-h-[380px] overflow-hidden flex flex-col justify-between border border-[var(--border)] shadow-md">
            {/* Background Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${activeProject.gradient} opacity-40 pointer-events-none transition-all duration-700`}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 space-y-6"
              >
                {/* Project Header Badges & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-black gradient-text">
                      {activeProject.number}
                    </span>
                    {activeProject.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-300 border border-amber-500/30">
                        <Sparkles className="h-3.5 w-3.5" /> Featured Architecture
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {activeProject.isPrivate ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/10 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-400 border border-slate-500/20">
                        <Lock className="h-3 w-3" /> Private Repo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                        <Globe className="h-3 w-3" /> Public Repo
                      </span>
                    )}

                    {activeProject.github && (
                      <a
                        href={activeProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white/80 dark:bg-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-500/40 transition-colors shadow-sm"
                        title="GitHub Code"
                      >
                        <GithubIcon className="h-4.5 w-4.5" />
                      </a>
                    )}

                    {activeProject.live && (
                      <a
                        href={activeProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-all shadow-sm"
                        title="Live Demo"
                      >
                        <ExternalLink className="h-4.5 w-4.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {activeProject.title}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-3xl">
                    {activeProject.description}
                  </p>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${activeProject.tagColor}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls & Pagination Dots */}
            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-[var(--border)] mt-8">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {projects.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentIndex(dotIdx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      dotIdx === currentIndex
                        ? "w-8 bg-purple-600"
                        : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-purple-400"
                    }`}
                  />
                ))}
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/80 dark:bg-white/[0.08] text-slate-800 dark:text-slate-200 hover:bg-purple-600 hover:text-white transition-colors shadow-sm"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/80 dark:bg-white/[0.08] text-slate-800 dark:text-slate-200 hover:bg-purple-600 hover:text-white transition-colors shadow-sm"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ── Grid Mode ── */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((proj, idx) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`card group relative flex flex-col justify-between overflow-hidden p-6 sm:p-7 transition-all duration-300 ${proj.accentBorder} hover:border-purple-500/40`}
              >
                <div
                  className={`absolute inset-0 rounded-[1.25rem] bg-gradient-to-br ${proj.gradient} opacity-80 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-2xl font-black gradient-text">{proj.number}</span>
                      <div className="flex items-center gap-2">
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-white transition-colors"
                          >
                            <GithubIcon className="h-4 w-4" />
                          </a>
                        )}
                        {proj.live && (
                          <a
                            href={proj.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {proj.tech.map((t) => (
                      <span key={t} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${proj.tagColor}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
