// "use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Reviews } from "@/components/sections/Reviews";
import { LiveAnalytics } from "@/components/sections/LiveAnalytics";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { ParticleBackground } from "@/components/ParticleBackground";
import { AIChatbot } from "@/components/AIChatbot";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ── Page background ── */}
      <div className="fixed inset-0 -z-20 bg-page" />
      <div className="fixed inset-0 -z-20 bg-grid" />

      {/* ── Ambient orbs ── */}
      <div
        className="pointer-events-none fixed -z-10 left-[-10%] top-[-8%] h-[650px] w-[650px] rounded-full
          bg-purple-400/20 dark:bg-purple-700/18 blur-[130px]"
        style={{ animation: "pulse 10s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none fixed -z-10 right-[-8%] bottom-[-8%] h-[550px] w-[550px] rounded-full
          bg-blue-400/18 dark:bg-blue-700/15 blur-[120px]"
        style={{ animation: "pulse 14s ease-in-out infinite", animationDelay: "3s" }}
      />
      <div
        className="pointer-events-none fixed -z-10 left-[40%] top-[50%] h-[400px] w-[400px] rounded-full
          bg-violet-400/10 dark:bg-violet-900/12 blur-[100px]"
        style={{ animation: "pulse 12s ease-in-out infinite", animationDelay: "6s" }}
      />

      {/* ── Particle layer ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <ParticleBackground />
      </div>

      {/* ── Content ── */}
      <Header />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-24 lg:pt-28">
        <Hero />

        {/* Divider */}
        <div className="divider my-2" />

        <About />
        <div className="divider my-2" />

        <Skills />
        <div className="divider my-2" />

        <Experience />
        <div className="divider my-2" />

        <Projects />
        <div className="divider my-2" />

        <Reviews />
        <div className="divider my-2" />

        <LiveAnalytics />
        <div className="divider my-2" />

        <Education />
        <div className="divider my-2" />

        <Contact />
        <Footer />
      </div>

      {/* Floating AI Assistant Chatbot */}
      <AIChatbot />
    </main>
  );
}
