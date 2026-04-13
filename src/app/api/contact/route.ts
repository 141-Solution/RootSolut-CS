import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/**
 * POST /api/contact
 * Validates and processes the contact form submission.
 * Optionally sends an email via Nodemailer if environment variables are configured.
 */
export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Alle Pflichtfelder müssen ausgefüllt sein." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse." },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Die Nachricht ist zu kurz." },
        { status: 400 }
      );
    }

    // Optional: send email via Nodemailer
    // Requires SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO in .env.local
    if (process.env.SMTP_HOST) {
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT ?? "587", 10),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Chronik Schwiesselmann" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_TO ?? process.env.SMTP_USER,
          replyTo: email,
          subject: `Kontaktanfrage von ${name}`,
          text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
          html: `<p><strong>Name:</strong> ${name}</p><p><strong>E-Mail:</strong> ${email}</p><hr/><p>${message.replace(/\n/g, "<br/>")}</p>`,
        });
      } catch (mailErr) {
        console.error("E-Mail konnte nicht gesendet werden:", mailErr);
        // Don't fail the request if email fails – log it and continue
      }
    } else {
      // Log to console when SMTP is not configured
      console.log("Neue Kontaktanfrage (kein SMTP konfiguriert):", { name, email, message });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Fehler in /api/contact:", err);
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    );
  }
}
