"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export function ResumeModal({ onClose }: { onClose: () => void }) {
  const [numPages, setNumPages] = useState<number>(0);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/65 p-4 backdrop-blur-md sm:p-6"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 28,
          }}
          className="glass-raised flex h-[88vh] w-full max-w-5xl flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-[var(--border)] bg-white/80 px-4 py-3 dark:bg-slate-950/80 sm:px-5">
            {/* Title */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                <FileText className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Resume — Arman Rakib
                </h2>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Software Engineer
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a
                href="/resume/Arman_Rakib_Resume.pdf"
                download="Arman_Rakib_Resume.pdf"
                className="btn-outline flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-sm"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </a>

              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-white/60 text-slate-500 transition-colors hover:text-slate-900 dark:bg-white/[0.04] dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-y-auto bg-slate-200/80 p-4 dark:bg-slate-900/80 sm:p-6">
            <Document
              file="/resume/Arman_Rakib_Resume.pdf"
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
              }}
              loading={
                <div className="flex min-h-[500px] items-center justify-center">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Loading resume...
                  </div>
                </div>
              }
              error={
                <div className="flex min-h-[500px] items-center justify-center">
                  <div className="text-center">
                    <p className="font-medium text-red-500">
                      Failed to load resume
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Please try downloading the PDF instead.
                    </p>
                  </div>
                </div>
              }
            >
              <div className="flex flex-col items-center gap-6">
                {Array.from(new Array(numPages), (_, index) => (
                  <div
                    key={`page_${index + 1}`}
                    className="overflow-hidden bg-white shadow-2xl"
                  >
                    <Page
                      pageNumber={index + 1}
                      width={800}
                      renderTextLayer
                      renderAnnotationLayer
                    />
                  </div>
                ))}
              </div>
            </Document>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}