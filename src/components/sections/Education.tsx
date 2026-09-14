"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, School } from "lucide-react";
import { portfolioConfig } from "@/config/portfolioConfig";

const ICONS = [GraduationCap, Award, School];

export function Education() {
  const educationItems = portfolioConfig.education.map((item, index) => ({
    ...item,
    icon: ICONS[index % ICONS.length],
  }));

  return (
    <section id="education" className="scroll-mt-24 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65 }}
      >
        {/* Label */}
        <div className="mb-3 flex items-center gap-2">
          <span className="section-num text-base">06.</span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Academic Background
          </span>
        </div>

        <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          My <span className="gradient-text">Education</span>
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {educationItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                whileHover={{ y: -6 }}
                className={`card group relative overflow-hidden transition-all duration-300 ${item.border}`}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 rounded-[1.25rem] bg-gradient-to-br ${item.gradient} opacity-70 pointer-events-none`}
                />

                <div className="relative p-6 sm:p-7">
                  {/* Icon */}
                  <div className={`mb-5 inline-flex rounded-xl p-3 ${item.iconBg} transition-transform group-hover:scale-110`}>
                    <Icon className={`h-7 w-7 ${item.iconColor}`} />
                  </div>

                  <h3 className="mb-1.5 text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className={`mb-2 font-semibold text-sm ${item.iconColor}`}>
                    {item.field}
                  </p>
                  <p className="text-sm leading-snug text-slate-500 dark:text-slate-500">
                    {item.school}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
