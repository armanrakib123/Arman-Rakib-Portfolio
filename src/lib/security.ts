/**
 * Database & Input Security Protocol Helper
 * Prevents XSS, NoSQL Injection, and Malicious Operators
 */

export function sanitizeInput(input: unknown): string {
  if (typeof input !== "string") return "";
  
  // Neutralize potential script tags and HTML injection
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\$/g, "") // Prevent MongoDB NoSQL operator injection
    .trim();
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
