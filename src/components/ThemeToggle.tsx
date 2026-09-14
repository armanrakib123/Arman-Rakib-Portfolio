"use client";

import { Moon, Sun, Monitor, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const themeOptions = [
  { id: "dark", label: "Dark Mode", icon: Moon, color: "text-purple-400" },
  { id: "light", label: "Light Mode", icon: Sun, color: "text-amber-500" },
  { id: "system", label: "System Default", icon: Monitor, color: "text-blue-400" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return <div className="h-9 w-9" />;

  const currentThemeObj = themeOptions.find((t) => t.id === theme) || themeOptions[1];
  const IconComponent = currentThemeObj.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme selector"
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)]
          bg-white/70 dark:bg-white/[0.06] shadow-sm transition-all duration-200
          hover:border-purple-400/50 hover:bg-purple-50/60 dark:hover:bg-purple-900/20 active:scale-95"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <IconComponent className={`h-4 w-4 ${currentThemeObj.color}`} />
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Multi-theme Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-2.5 w-44 rounded-2xl border border-[var(--border)] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-1.5 shadow-2xl z-50"
          >
            <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-[var(--border)] mb-1 flex items-center justify-between">
              <span>Theme Selector</span>
              <Zap className="h-3 w-3 text-amber-500" />
            </div>

            {themeOptions.map(({ id, label, icon: OptionIcon, color }) => {
              const isSelected = theme === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setTheme(id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <OptionIcon className={`h-3.5 w-3.5 ${color}`} />
                  <span>{label}</span>
                  {isSelected && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-500" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
