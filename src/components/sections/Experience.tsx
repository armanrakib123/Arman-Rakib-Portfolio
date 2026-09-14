"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { portfolioConfig } from "@/config/portfolioConfig";

export function Experience() {
  const roles = portfolioConfig.experience.roles;

  return (
    <section id="experience" className="scroll-mt-24 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65 }}
      >
        {/* Label */}
        <div className="mb-3 flex items-center gap-2">
          <span className="section-num text-base">03.</span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Work History
          </span>
        </div>

        <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Professional <span className="gradient-text">Experience</span>
        </h2>

        <div className="glass p-5 sm:p-8 lg:p-10 space-y-10">
          {/* Timeline */}
          <div className="relative space-y-10">
            {/* Vertical track */}
            <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-purple-500 via-blue-400 to-slate-200 dark:to-slate-700 hidden sm:block" />

            {roles.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                className="relative sm:pl-10"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[1px] top-1 hidden sm:flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    exp.type === "current"
                      ? "border-purple-500 bg-purple-100 dark:bg-purple-900/40"
                      : "border-slate-400 bg-slate-100 dark:bg-slate-800 dark:border-slate-600"
                  }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      exp.type === "current" ? "bg-purple-500" : "bg-slate-400 dark:bg-slate-500"
                    }`}
                  />
                </div>

                <div className={`card group p-5 sm:p-6 transition-all duration-300 hover:border-purple-500/40 ${exp.type === "current" ? "border-purple-400/35 dark:border-purple-500/30 shadow-md" : ""}`}>
                  {/* Role & meta */}
                  <div className="mb-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3
                        className="text-lg font-extrabold sm:text-xl text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors"
                      >
                        {exp.role}
                      </h3>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-purple-500" />
                        <span className={exp.type === "current" ? "font-bold text-purple-600 dark:text-purple-400" : "text-slate-800 dark:text-slate-200"}>
                          {exp.company}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-sm leading-relaxed text-slate-800 dark:text-slate-200 sm:text-base font-medium">
                        <span
                          className={`mt-[3px] shrink-0 text-base leading-none ${
                            exp.type === "current" ? "text-purple-500 dark:text-purple-400" : "text-slate-400 dark:text-slate-500"
                          }`}
                        >
                          ▹
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Badges */}
                  {exp.tech && exp.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[var(--border)]">
                      {exp.tech.map((t) => (
                        <span key={t} className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-purple-500/25 bg-purple-500/10 text-purple-700 dark:text-purple-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

