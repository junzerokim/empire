import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "empirehotel.cz@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Empire Hotel <onboarding@resend.dev>";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const guests = typeof body.guests === "string" ? body.guests.trim() : "";
  const checkin = typeof body.checkin === "string" ? body.checkin.trim() : "";
  const checkout = typeof body.checkout === "string" ? body.checkout.trim() : "";
  const roomType = typeof body.room_type === "string" ? body.room_type.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    guests && `Guests: ${guests}`,
    checkin && `Check-in: ${checkin}`,
    checkout && `Check-out: ${checkout}`,
    roomType && `Room type: ${roomType}`,
    message && `Message:\n${message}`,
  ].filter(Boolean);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `New inquiry from ${name} — Empire Hotel website`,
    text: lines.join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
