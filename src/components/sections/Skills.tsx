"use client";

import { motion } from "framer-motion";
import { Layout, Server, Database, Wrench, Code2,Cloud } from "lucide-react";
import { FaReact,FaGithub, FaAws,FaDocker,FaLinux, FaPython,FaShieldAlt, FaNodeJs, FaGitAlt,FaJava, FaHtml5, FaCss3Alt, FaRobot } from "react-icons/fa";
import { SiGo,SiGithubactions, SiNginx, SiPrisma, SiSharp, SiPhp,SiRedis, SiNextdotjs, SiJavascript, SiTypescript, SiMongodb, SiMysql, SiPostgresql, SiSnowflake, SiSpringboot, SiLaravel, SiNestjs, SiCplusplus, SiDjango, SiFastapi, SiTailwindcss, SiHibernate } from "react-icons/si";
import { BiNetworkChart,BiGitMerge, BiCodeAlt, BiCheckShield, BiChalkboard,BiLayer,BiGitBranch } from "react-icons/bi";
import { TbApi,TbPlugConnected,TbBrandCpp,TbBug,TbGauge,TbComponents } from "react-icons/tb";
import { portfolioConfig } from "@/config/portfolioConfig";

// Dynamic Icon Map Lookup
const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  // Category Icons (Lucide)
  Layout,
  Server,
  Database,
  Wrench,
  Code2,
  Cloud,
  // Tech Stack Icons
  FaReact,
  FaGithub,
  FaAws,
  FaDocker,
  FaLinux,
  FaPython,
  FaNodeJs,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaRobot,
  TbBug,
  TbGauge,
  TbComponents,
  FaJava,
  FaShieldAlt,
  TbPlugConnected,
  TbBrandCpp,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiTypescript,
  SiHibernate,
  SiCplusplus,
  SiPrisma,
  SiNginx,
  SiGo,
  SiPhp,
  SiRedis,
  SiSpringboot,
  SiLaravel,
  SiSharp,
  SiNestjs,
  SiFastapi,
  SiGithubactions,
  SiDjango,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiSnowflake,
  BiNetworkChart,
  BiCodeAlt,
  BiCheckShield,
  BiGitBranch,
  BiGitMerge,
  BiChalkboard,
  BiLayer,
  TbApi,
};

function renderSkillIcon(iconName: string, customColor?: string) {
  const IconComponent = ICON_MAP[iconName] || Code2;

  if (customColor && customColor.startsWith("#")) {
    return <IconComponent className="w-5 h-5 shrink-0" style={{ color: customColor }} />;
  }

  const colorClass = customColor || "text-purple-500";
  return <IconComponent className={`w-5 h-5 shrink-0 ${colorClass}`} />;
}

export function Skills() {
  const { marquee: marqueeSkills, categories: skillCategories } = portfolioConfig.skills;

  return (
    <section id="skills" className="scroll-mt-24 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65 }}
      >
        {/* Label */}
        <div className="mb-3 flex items-center gap-2">
          <span className="section-num text-base">02.</span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Technical Skills
          </span>
        </div>

        <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          My <span className="gradient-text">Core Skills & Tech Stack</span>
        </h2>

        {/* ── Live Infinite Marquee Skill Banner Slider ── */}
        <div className="mb-10 overflow-hidden py-3.5 glass rounded-2xl border border-purple-500/20 relative shadow-sm">
          <div className="flex gap-6 sm:gap-8 whitespace-nowrap animate-scroll">
            {[...marqueeSkills, ...marqueeSkills, ...marqueeSkills].map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border border-[var(--border)] bg-white/80 dark:bg-white/[0.05] text-xs font-bold text-slate-900 dark:text-slate-100 shadow-sm shrink-0 hover:scale-105 hover:border-purple-500/40 transition-all cursor-default"
              >
                {renderSkillIcon(item.icon, item.color)}
                <span className="text-slate-900 dark:text-slate-100 font-bold">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((cat, idx) => {
            const CategoryIcon = ICON_MAP[cat.icon] || Layout;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`card group relative overflow-hidden p-6 transition-all duration-300 ${cat.border} hover:border-purple-500/40 hover:shadow-lg`}
              >
                <div
                  className={`absolute inset-0 rounded-[1.25rem] bg-gradient-to-br ${cat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />

                <div className={`relative mb-5 flex items-center gap-3 rounded-xl border ${cat.border} bg-white/80 dark:bg-white/[0.06] px-3.5 py-2.5 backdrop-blur-md shadow-sm`}>
                  <CategoryIcon className={`w-5 h-5 ${cat.iconColor}`} />
                  <h3 className="font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {cat.title}
                  </h3>
                </div>

                <ul className="relative space-y-3">
                  {cat.skills.map((skill) => (
                    <motion.li
                      key={skill.name}
                      whileHover={{ x: 4, scale: 1.02 }}
                      className="flex items-center gap-3 text-sm font-semibold text-slate-800 dark:text-slate-200 cursor-default group/item"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-white dark:bg-slate-900 shadow-sm group-hover/item:border-purple-500/30 transition-all">
                        {renderSkillIcon(skill.icon, skill.color)}
                      </div>
                      <span className="group-hover/item:text-purple-600 dark:group-hover/item:text-purple-300 transition-colors">
                        {skill.name}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
