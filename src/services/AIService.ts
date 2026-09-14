import { GoogleGenerativeAI } from "@google/generative-ai";
import { portfolioConfig } from "@/config/portfolioConfig";

export interface AIServiceResponse {
  success: boolean;
  reply: string;
  provider: string;
}

export interface AIRefineResponse {
  success: boolean;
  refinedRequirements: string;
  provider: string;
}

/**
 * OOP Class: AIService
 * Encapsulates multi-provider AI model execution (Gemini, Groq, Pollinations)
 * driven dynamically by portfolioConfig.json.
 */
export class AIService {
  private systemPrompt: string;
  private geminiKey: string | undefined;
  private groqKey: string | undefined;

  constructor() {
    this.geminiKey = process.env.GEMINI_API_KEY;
    this.groqKey = process.env.GROQ_API_KEY;

    const dev = portfolioConfig.developer;
    const exp = portfolioConfig.experience.roles[0];
    const featuredProjects = portfolioConfig.projects
      .filter((p) => p.featured)
      .map((p) => `${p.title} (${p.live || p.github})`)
      .join(", ");

    this.systemPrompt = `
You are the official AI Portfolio Assistant for ${dev.name}.
DEVELOPER PROFILE:
- Name: ${dev.name}
- Role: ${dev.title}
- Experience: ${dev.experienceYears} years building web apps, SaaS platforms, cloud solutions.
- Work History: ${exp.company} (${exp.period}, ${exp.role}).
- Featured Projects: ${featuredProjects}
- Contact: ${dev.email} | WhatsApp: ${dev.whatsapp} | GitHub: ${dev.github}
`;
  }

  /**
   * Generates a conversational chat reply using available AI providers
   */
  public async generateChatReply(query: string): Promise<AIServiceResponse> {
    // Strategy 1: Groq Cloud (Llama 3.3 70B)
    if (this.groqKey && this.groqKey.trim() !== "") {
      try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.groqKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: this.systemPrompt },
              { role: "user", content: query },
            ],
            temperature: 0.5,
            max_tokens: 300,
          }),
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) return { success: true, reply: reply.trim(), provider: "Groq (Llama 3.3)" };
        }
      } catch (err) {
        console.error("AIService Groq error:", err);
      }
    }

    // Strategy 2: Google Gemini (Gemini 1.5 Flash)
    if (this.geminiKey && this.geminiKey.trim() !== "") {
      try {
        const genAI = new GoogleGenerativeAI(this.geminiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: this.systemPrompt,
        });

        const result = await model.generateContent(query);
        const reply = result.response.text();
        return { success: true, reply: reply.trim(), provider: "Google Gemini" };
      } catch (err) {
        console.error("AIService Gemini error:", err);
      }
    }

    // Strategy 3: Keyless Fallback Knowledge Base
    return this.getKnowledgeBaseFallback(query);
  }

  /**
   * Refines draft client requirements into a structured technical scope
   */
  public async refineProjectRequirements(
    draft: string,
    subject: string,
    budget: string,
    preferredProvider?: string
  ): Promise<AIRefineResponse> {
    const prompt = `
You are an expert technical product manager and software architect.
Refine the following project requirements into a clean, professional, concise specification statement under 120 words.
Subject: ${subject}
Budget: ${budget}
Raw Draft: "${draft}"
Instructions: Use bullet points, highlight core features, target tech stack, and goals. Output ONLY refined text directly.
`;

    // Try Groq if selected or available
    if ((preferredProvider === "groq" || !this.geminiKey) && this.groqKey) {
      try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.groqKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
            max_tokens: 300,
          }),
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          const refined = data.choices?.[0]?.message?.content;
          if (refined) return { success: true, refinedRequirements: refined.trim(), provider: "Groq (Llama 3.3)" };
        }
      } catch (err) {
        console.error("AIService Refine Groq error:", err);
      }
    }

    // Try Gemini if available
    if (this.geminiKey) {
      try {
        const genAI = new GoogleGenerativeAI(this.geminiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        return { success: true, refinedRequirements: result.response.text().trim(), provider: "Google Gemini" };
      } catch (err) {
        console.error("AIService Refine Gemini error:", err);
      }
    }

    // Fallback template
    const fallbackText = `• Project Objective: ${subject || "Custom Development"}\n• Target Architecture: Scalable, high-performance web application with secure backend API & database integration.`;

    return { success: true, refinedRequirements: fallbackText, provider: "Smart Template" };
  }

  private getKnowledgeBaseFallback(query: string): AIServiceResponse {
    const lower = query.toLowerCase();
    const dev = portfolioConfig.developer;
    const exp = portfolioConfig.experience.roles[0];
    let reply = "";

    if (lower.includes("experience") || lower.includes("work") || lower.includes("company")) {
      reply = `${dev.name} has ${dev.experienceYears} years of software engineering experience, progressing from Associate Developer to ${exp.role} at ${exp.company}.`;
    } else if (lower.includes("project") || lower.includes("workpilot") || lower.includes("cloudledger")) {
      reply = `${dev.firstName} built CloudLedger, WorkPilot-AI, and OpenConnect. Explore all projects at ${dev.github}`;
    } else if (lower.includes("contact") || lower.includes("email") || lower.includes("whatsapp")) {
      reply = `Reach ${dev.firstName} at ${dev.email}, WhatsApp ${dev.whatsapp}, or fill out the portfolio contact form.`;
    } else {
      reply = `Hello! I am ${dev.firstName}'s AI Portfolio Assistant. Ask me anything about ${dev.name}'s software experience, GitHub projects, or technical skills!`;
    }

    return { success: true, reply, provider: "Knowledge Base" };
  }
}
