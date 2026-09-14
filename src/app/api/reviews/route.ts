import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { sanitizeInput } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");
    const collection = db.collection("reviews");

    const reviews = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json(
      { success: false, reviews: [], error: "Database error fetching reviews." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientName, clientRole, company, rating, reviewText } = body;

    const cleanName = sanitizeInput(clientName);
    const cleanRole = sanitizeInput(clientRole) || "Client";
    const cleanCompany = sanitizeInput(company);
    const cleanText = sanitizeInput(reviewText);
    const numRating = Math.min(5, Math.max(1, Number(rating) || 5));

    if (!cleanName || !cleanText) {
      return NextResponse.json(
        { error: "Client Name and Review Text are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("Portfolio");
    const collection = db.collection("reviews");

    const newReview = {
      clientName: cleanName,
      clientRole: cleanRole,
      company: cleanCompany,
      rating: numRating,
      reviewText: cleanText,
      createdAt: new Date(),
      isVerified: true,
    };

    const result = await collection.insertOne(newReview);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your review has been published.",
        review: { ...newReview, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json(
      { error: "Failed to submit review." },
      { status: 500 }
    );
  }
}
