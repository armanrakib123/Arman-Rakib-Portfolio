"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X, Send, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { portfolioConfig } from "@/config/portfolioConfig";

const navLinks = portfolioConfig.navigation;
const developer = portfolioConfig.developer;

export function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const ids = navLinks.map((l) => l.href.substring(1));
      const offset = window.innerHeight * 0.35;

      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-2.5 border-b border-[var(--border)] bg-white/85 dark:bg-[#080612]/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(124,58,237,0.12)]"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="#hero"
          className="relative z-50 flex items-center gap-2.5 text-xl font-black tracking-tight select-none group"
        >
          <div className="h-16 w-16 rounded-xl bg-gradient-to-tr flex items-center justify-center text-white text-xs font-black shadow-md group-hover:scale-110 group-hover:shadow-purple-500/40 transition-all duration-300">
            <img src="/Logo.ico" alt="Arman Rakib" className="h-full w-full rounded-xl" />
          </div>
          {/* <div className="flex items-center gap-1">
            <span className="gradient-text font-black text-lg sm:text-xl">{developer.firstName}</span>
            <span className="text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl hidden sm:inline">
              {developer.lastName}
            </span>
          </div> */}
        </Link>

        {/* Desktop Floating Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1.5 glass px-4 py-1.5 rounded-full border border-purple-500/25 bg-white/70 dark:bg-white/[0.05] shadow-md backdrop-blur-xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 ${
                  isActive
                    ? "text-purple-600 dark:text-purple-300"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-purple-500/15 border border-purple-500/35"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Controls & CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="#contact"
            className="btn-primary text-xs py-2 px-5 rounded-full font-extrabold flex items-center gap-1.5 shadow-md hover:shadow-purple-500/35 transition-all"
          >
            <Send className="h-3.5 w-3.5" />
            Hire Me
          </Link>
        </div>

        {/* Mobile controls & toggle button */}
        <div className="flex items-center gap-2 lg:hidden z-50">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl border border-[var(--border)] bg-white/80 dark:bg-white/[0.08] backdrop-blur-md text-slate-800 dark:text-slate-100 transition-colors shadow-sm"
            aria-label="Toggle Navigation Drawer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-b border-[var(--border)] bg-white/95 dark:bg-[#080612]/95 backdrop-blur-2xl lg:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-1 px-4 py-5 max-w-7xl mx-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                      activeSection === link.href.substring(1)
                        ? "text-purple-600 dark:text-purple-300 bg-purple-500/10 border border-purple-500/25"
                        : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-3 mt-2 border-t border-[var(--border)]">
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full py-2.5 rounded-xl text-center font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="h-4 w-4" />
                  Hire Me / Submit Inquiry
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
