"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X, ShieldCheck } from "lucide-react";
import { useEffect } from "react";

export interface ToastProps {
  show: boolean;
  type: "success" | "error" | "info";
  title?: string;
  message: string;
  duration?: number; // Duration in ms (default: 6000ms)
  onClose: () => void;
}

export function ToastNotification({
  show,
  type,
  title,
  message,
  duration = 6000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (show && message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, message, duration, onClose]);

  const isSuccess = type === "success";
  const isError = type === "error";

  return (
    <AnimatePresence>
      {show && message && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="fixed top-20 sm:top-24 right-4 sm:right-8 z-[100] max-w-md w-[calc(100vw-2rem)] sm:w-auto"
        >
          <div
            className={`glass-raised p-4 sm:p-4.5 rounded-2xl border shadow-2xl backdrop-blur-2xl flex items-start gap-3.5 relative overflow-hidden transition-colors ${
              isSuccess
                ? "border-emerald-500/40 bg-white/95 dark:bg-slate-950/95 text-slate-900 dark:text-slate-100"
                : isError
                ? "border-rose-500/40 bg-white/95 dark:bg-slate-950/95 text-slate-900 dark:text-slate-100"
                : "border-purple-500/40 bg-white/95 dark:bg-slate-950/95 text-slate-900 dark:text-slate-100"
            }`}
          >
            {/* Icon Badge */}
            <div
              className={`p-2.5 rounded-xl shrink-0 ${
                isSuccess
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25"
                  : isError
                  ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/25"
                  : "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/25"
              }`}
            >
              {isSuccess ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : isError ? (
                <AlertCircle className="h-5 w-5" />
              ) : (
                <Info className="h-5 w-5" />
              )}
            </div>

            {/* Message Content */}
            <div className="flex-1 pr-3">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5 leading-snug">
                {title || (isSuccess ? "Action Successful!" : isError ? "Notification Alert" : "Information")}
                {isSuccess && <ShieldCheck className="h-4 w-4 text-emerald-500" />}
              </h4>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 mt-1 font-medium">{message}</p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Animated Progress Bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className={`absolute bottom-0 left-0 h-1 ${
                isSuccess ? "bg-emerald-500" : isError ? "bg-rose-500" : "bg-purple-500"
              }`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
