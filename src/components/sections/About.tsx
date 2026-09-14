"use client";

import { motion } from "framer-motion";
import { Sparkles, Terminal, Cpu, Database, Layers, Code2 } from "lucide-react";
import { portfolioConfig } from "@/config/portfolioConfig";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Layers,
  Database,
  Terminal,
  Code2,
};

export function About() {
  const { bioParagraphs, traits, focusAreas } = portfolioConfig.about;

  return (
    <section id="about" className="scroll-mt-24 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
      >
        {/* Section label */}
        <div className="mb-3 flex items-center gap-2">
          <span className="section-num text-base">01.</span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            About Me
          </span>
        </div>

        <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Crafting digital experiences<br />
          <span className="gradient-text">that scale & endure</span>
        </h2>

        <div className="glass p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 items-center">
            {/* ── Bio ── */}
            <div className="space-y-5">
              {bioParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-base leading-[1.85] text-slate-800 dark:text-slate-200 sm:text-lg">
                  {paragraph}
                </p>
              ))}

              {/* Trait chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {traits.map((t) => (
                  <motion.span
                    key={t}
                    whileHover={{ scale: 1.08 }}
                    className="tag text-xs font-bold shadow-sm cursor-default hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* ── Focus Areas Cards ── */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                  Core Focus Areas
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {focusAreas.map(({ label, icon, color }, idx) => {
                  const IconComponent = (icon && ICON_MAP[icon]) || Cpu;
                  return (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.45 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="card flex flex-col gap-3 p-5 group transition-all duration-300 cursor-default hover:border-purple-500/40"
                    >
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${color} shadow-sm group-hover:scale-110 transition-transform`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                        {label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
