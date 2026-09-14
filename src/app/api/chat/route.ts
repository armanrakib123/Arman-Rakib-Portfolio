import { NextResponse } from "next/server";
import { AIService } from "@/services/AIService";

const aiService = new AIService();

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message string is required." }, { status: 400 });
    }

    const response = await aiService.generateChatReply(message);

    return NextResponse.json(response);
  } catch (error) {
    console.error("API /api/chat Controller error:", error);
    return NextResponse.json({ error: "Failed to process chat request." }, { status: 500 });
  }
}
