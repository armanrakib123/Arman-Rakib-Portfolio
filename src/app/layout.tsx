import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7ff" },
    { media: "(prefers-color-scheme: dark)", color: "#080612" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://work-pilot-ai.vercel.app"), // Replace with primary portfolio domain
  title: {
    default: "Arman Rakib — Software Engineer & Backend Engineer",
    template: "%s | Arman Rakib",
  },
  description:
    "Senior Full Stack Developer & System Architect with 4.5+ years of experience designing scalable multi-tenant SaaS platforms, Next.js web applications, Python automation engines, and cloud data solutions.",
  keywords: [
    "Arman Rakib",
    "Software Engineer",
    "Full Stack Engineer",
    "Next.js Developer",
    "React Developer",
    "SpringBoot Developer",
    "Laravel Developer",
    "Portfolio",
  ],
  authors: [{ name: "Arman Rakib", url: "https://github.com/armanrakib123" }],
  creator: "Arman Rakib",
  publisher: "Arman Rakib",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/armanrakib123",
    title: "Arman Rakib — Software Engineer & Backend Engineer",
    description:
      "I specialize in full-stack and backend development, with strong foundations in Java, JavaScript, TypeScript, Python, Go and modern backend frameworks.",
    siteName: "Arman Rakib Portfolio",
    images: [
      {
        url: "/rakib.png",
        width: 1200,
        height: 630,
        alt: "Arman Rakib Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arman Rakib — Software Engineer & Backend Engineer",
    description:
      "I specialize in full-stack and backend development, with strong foundations in Java, JavaScript, TypeScript, Python, Go and modern backend frameworks.",
    creator: "Arman Rakib",
    images: ["/rakib.png"],
  },
  alternates: {
    canonical: "https://github.com/armanrakib123",
  },
};

// JSON-LD Structured Data Schema for Google Search Indexing
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arman Rakib",
  jobTitle: "Software Engineer & Backend",
  worksFor: {
    "@type": "Organization",
    name: "eDge Wrapper Technology Pvt. Ltd.",
  },
  url: "https://github.com/armanrakib123",
  sameAs: [
    "https://github.com/armanrakib123",
    "https://www.linkedin.com/in/arman-rakib-9b4792317/",
    "https://www.instagram.com/armanrakib83/",
  ],
  knowsAbout: [
    "Full Stack Software Engineering",
    "React.js & Next.js 16",
    "Python & Node.js",
    "Multi-Tenant SaaS Architecture",
    "MongoDB & PostgreSQL Database Optimization",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} font-sans antialiased text-slate-900 dark:text-slate-100 transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
