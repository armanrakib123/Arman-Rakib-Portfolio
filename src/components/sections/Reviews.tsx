"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Plus, X, ShieldCheck, MessageSquare, Loader2, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { ToastNotification } from "@/components/common/ToastNotification";

interface Review {
  _id: string;
  clientName: string;
  clientRole: string;
  company: string;
  rating: number;
  reviewText: string;
  createdAt?: string;
  isVerified?: boolean;
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  // Form State
  const [newReview, setNewReview] = useState({
    clientName: "",
    clientRole: "",
    company: "",
    rating: 5,
    reviewText: "",
  });

  const [submitStatus, setSubmitStatus] = useState<{
    submitting: boolean;
    success: boolean | null;
    message: string;
  }>({
    submitting: false,
    success: null,
    message: "",
  });

  // Fetch real reviews from MongoDB API
  useEffect(() => {
    fetchReviews();
  }, []);

  // Trigger floating toast notification
  useEffect(() => {
    if (submitStatus.message && submitStatus.success !== null) {
      setShowToast(true);
    }
  }, [submitStatus.message, submitStatus.success]);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error("Error loading reviews from database:", err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-play slider
  useEffect(() => {
    if (reviews.length <= 1 || isModalOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reviews.length, isModalOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ submitting: true, success: null, message: "" });

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus({
          submitting: false,
          success: true,
          message: "Thank you! Your testimonial has been published successfully.",
        });

        // Add new review dynamically to state and display it
        if (data.review) {
          setReviews((prev) => [data.review, ...prev]);
          setCurrentIndex(0);
        }

        setTimeout(() => {
          setIsModalOpen(false);
          setNewReview({
            clientName: "",
            clientRole: "",
            company: "",
            rating: 5,
            reviewText: "",
          });
        }, 1200);
      } else {
        setSubmitStatus({
          submitting: false,
          success: false,
          message: data.error || "Failed to publish review.",
        });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({
        submitting: false,
        success: false,
        message: "Network error submitting review.",
      });
    }
  };

  const currentReview = reviews[currentIndex];

  return (
    <section id="reviews" className="scroll-mt-24 py-16 sm:py-20 relative">
      {/* ── Reusable Toast Notification Component ── */}
      <ToastNotification
        show={showToast}
        type={submitStatus.success ? "success" : "error"}
        title={submitStatus.success ? "Review Published!" : "Submission Alert"}
        message={submitStatus.message}
        onClose={() => setShowToast(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65 }}
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="section-num text-base">05.</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Testimonials & Endorsements
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-50 dark:bg-purple-500/10 px-3.5 py-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-all shadow-sm"
          >
            <Plus className="h-4 w-4 text-purple-500" />
            Write a Review
          </button>
        </div>

        <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Client <span className="gradient-text">Testimonials & Reviews</span>
        </h2>

        {/* Carousel Container */}
        <div className="glass p-6 sm:p-10 lg:p-12 relative overflow-hidden rounded-3xl min-h-[280px] flex flex-col justify-between">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500 mb-3" />
              <p className="text-xs text-slate-500">Fetching reviews from database...</p>
            </div>
          ) : reviews.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                <Sparkles className="h-7 w-7" />
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Be the First Client to Leave a Review!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Have we worked together on a project? Share your experience and your review will appear live on this slider.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary text-sm py-2.5 px-6 rounded-xl flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Submit Your Review
              </button>
            </div>
          ) : currentReview ? (
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview._id || currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Top Bar: Quote icon & Star Rating */}
                  <div className="flex items-center justify-between">
                    <Quote className="h-10 w-10 text-purple-500/40" />

                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={`h-5 w-5 ${
                            starIdx < currentReview.rating
                              ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                              : "text-slate-300 dark:text-slate-700"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                        {currentReview.rating}.0
                      </span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-slate-700 dark:text-slate-200 italic">
                    &quot;{currentReview.reviewText}&quot;
                  </p>

                  {/* Client Info Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white font-black text-lg shadow-md">
                        {currentReview.clientName.charAt(0)}
                      </div>

                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                          {currentReview.clientName}
                          {currentReview.isVerified && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              <ShieldCheck className="h-3 w-3" /> Verified Client
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {currentReview.clientRole} {currentReview.company ? `• ${currentReview.company}` : ""}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Controls */}
                    {reviews.length > 1 && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePrev}
                          aria-label="Previous review"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white/70 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 hover:bg-purple-500 hover:text-white dark:hover:bg-purple-600 transition-colors shadow-sm"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={handleNext}
                          aria-label="Next review"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white/70 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 hover:bg-purple-500 hover:text-white dark:hover:bg-purple-600 transition-colors shadow-sm"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Pagination Dots */}
              {reviews.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {reviews.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setCurrentIndex(dotIdx)}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        dotIdx === currentIndex
                          ? "w-8 bg-purple-500"
                          : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-purple-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </motion.div>

      {/* ── Submit Review Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-raised w-full max-w-lg rounded-2xl overflow-hidden p-6 sm:p-8 shadow-2xl border border-[var(--border)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6 border-b border-[var(--border)] pb-4">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    Submit Client Testimonial
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                  className="rounded-full p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={newReview.clientName}
                    onChange={(e) => setNewReview({ ...newReview, clientName: e.target.value })}
                    className="w-full rounded-xl border border-[var(--border)] bg-white/70 dark:bg-slate-950/50 px-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CTO / Product Lead"
                      value={newReview.clientRole}
                      onChange={(e) => setNewReview({ ...newReview, clientRole: e.target.value })}
                      className="w-full rounded-xl border border-[var(--border)] bg-white/70 dark:bg-slate-950/50 px-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Company / Org
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. TechCorp Solutions"
                      value={newReview.company}
                      onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                      className="w-full rounded-xl border border-[var(--border)] bg-white/70 dark:bg-slate-950/50 px-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Rating Picker */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Rating (1 to 5 Stars)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((starNum) => (
                      <button
                        key={starNum}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: starNum })}
                        className="p-1 text-amber-400 hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            starNum <= newReview.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300 dark:text-slate-700"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-bold text-amber-400">
                      {newReview.rating} Stars
                    </span>
                  </div>
                </div>

                {/* Review Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Your Testimonial / Feedback *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share your experience working together..."
                    value={newReview.reviewText}
                    onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                    className="w-full rounded-xl border border-[var(--border)] bg-white/70 dark:bg-slate-950/50 px-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitStatus.submitting}
                  className="btn-primary w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  {submitStatus.submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Publishing Review...
                    </>
                  ) : (
                    "Publish Testimonial"
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
