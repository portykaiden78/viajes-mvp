import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function GET() {
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY! });

  const models = await client.models.list();

  return NextResponse.json(models.data);
}
