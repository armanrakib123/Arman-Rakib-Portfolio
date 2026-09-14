import { NextResponse } from "next/server";
import { AIService } from "@/services/AIService";

const aiService = new AIService();

export async function POST(request: Request) {
  try {
    const { draftRequirements, subject, budget, provider } = await request.json();

    if (!draftRequirements || typeof draftRequirements !== "string" || !draftRequirements.trim()) {
      return NextResponse.json(
        { error: "Please enter your initial draft requirements before refining." },
        { status: 400 }
      );
    }

    const response = await aiService.refineProjectRequirements(
      draftRequirements,
      subject || "Custom Development",
      budget || "Flexible",
      provider
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("API /api/refine-requirements Controller error:", error);
    return NextResponse.json(
      { error: "Failed to refine requirements. Please try again." },
      { status: 500 }
    );
  }
}
