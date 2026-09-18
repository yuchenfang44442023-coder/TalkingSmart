import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { message, relationship, goal, tone } = await request.json();

  const response = await openai.responses.create({
    model: "gpt-5.6-luna",
    store: false,
    input: `
You are TalkingSmart, an AI reply assistant.

Someone sent the user this message:
"${message}"

Relationship: ${relationship}
Goal: ${goal}
Tone: ${tone}

Write ONE natural reply that the user can send directly.

Rules:
- Sound like a real person.
- Keep it concise.
- Match the language of the original message.
- Output only the reply.
`,
  });

  return NextResponse.json({
    reply: response.output_text,
  });
}