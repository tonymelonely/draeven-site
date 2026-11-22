import { NextRequest, NextResponse } from "next/server";
import { appendFeedback, listFeedback } from "@/lib/feedback-store";
import { readSession } from "@/lib/session";

export async function GET() {
  const entries = await listFeedback(40);
  return NextResponse.json({ entries });
}

export async function POST(request: NextRequest) {
  const session = await readSession();
  let body: { stars?: unknown; message?: unknown; anonymous?: unknown };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const stars = Number(body.stars);
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const anonymous = !session || body.anonymous === true;

  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    return NextResponse.json({ error: "Stars must be 1–5." }, { status: 400 });
  }

  const minLen = message.startsWith("[doc]") ? 6 : 8;
  if (message.length < minLen || message.length > 2000) {
    return NextResponse.json(
      { error: `Message must be ${minLen}–2000 characters.` },
      { status: 400 }
    );
  }

  const entry = await appendFeedback({
    stars,
    message,
    anonymous,
    ...(!anonymous && session
      ? { userId: session.id, userName: session.name }
      : {}),
  });

  return NextResponse.json({ entry }, { status: 201 });
}
