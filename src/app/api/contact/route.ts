import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { sendThankYouEmail } from "@/lib/email";
import { sanitizeInput, validateEmail } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, requirements, budget } = body;

    // Sanitize & Validate Inputs
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email).toLowerCase();
    const cleanSubject = sanitizeInput(subject) || "General Inquiry";
    const cleanRequirements = sanitizeInput(requirements);
    const cleanBudget = sanitizeInput(budget) || "Flexible";

    if (!cleanName || !cleanEmail || !cleanRequirements) {
      return NextResponse.json(
        { error: "Please fill in all required fields with valid text." },
        { status: 400 }
      );
    }

    if (!validateEmail(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address format." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("Portfolio");
    const collection = db.collection("contacts");

    // Insert submission into MongoDB
    const result = await collection.insertOne({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      requirements: cleanRequirements,
      budget: cleanBudget,
      createdAt: new Date(),
      status: "new",
      userAgent: sanitizeInput(request.headers.get("user-agent") || "unknown"),
    });

    // Send thank you confirmation email to the user
    await sendThankYouEmail({
      toEmail: cleanEmail,
      userName: cleanName,
      subject: cleanSubject,
      requirements: cleanRequirements,
      budget: cleanBudget,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your requirements have been successfully received! A confirmation email has been dispatched to your inbox.",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("MongoDB Contact Submission Error:", error);
    return NextResponse.json(
      {
        error: "Unable to process inquiry. Please try emailing directly.",
      },
      { status: 500 }
    );
  }
}
