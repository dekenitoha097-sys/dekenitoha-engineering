import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 120) {
      return NextResponse.json(
        { error: "Le nom est invalide." },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim()) || email.trim().length > 320) {
      return NextResponse.json(
        { error: "L'adresse email est invalide." },
        { status: 400 }
      );
    }

    if (typeof subject !== "string" || subject.trim().length < 3 || subject.trim().length > 180) {
      return NextResponse.json(
        { error: "Le sujet est invalide." },
        { status: 400 }
      );
    }

    if (typeof message !== "string" || message.trim().length < 10 || message.trim().length > 5000) {
      return NextResponse.json(
        { error: "Le message doit contenir entre 10 et 5000 caracteres." },
        { status: 400 }
      );
    }

    const userEmail = process.env.USER_EMAIL;
    const appPass = process.env.APP_PASS;

    if (!userEmail || !appPass) {
      console.error("Contact API config error: USER_EMAIL or APP_PASS missing");
      return NextResponse.json(
        { error: "Configuration email incomplete. Ajoutez USER_EMAIL et APP_PASS dans .env." },
        { status: 500 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeSubject = escapeHtml(cleanSubject);
    const safeMessage = escapeHtml(cleanMessage);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: userEmail,
        pass: appPass,
      },
    });

    const ownerHtml = `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px; color:#0f172a;">
        <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden;">
          <div style="padding:18px 22px; background:linear-gradient(135deg, #0ea5e9, #2563eb); color:#ffffff;">
            <h2 style="margin:0; font-size:20px;">Nouvelle demande de contact</h2>
            <p style="margin:8px 0 0; font-size:13px; opacity:0.95;">Formulaire portfolio</p>
          </div>
          <div style="padding:22px;">
            <table style="width:100%; border-collapse:collapse; font-size:14px;">
              <tr>
                <td style="padding:8px 0; color:#475569; width:130px;"><strong>Nom</strong></td>
                <td style="padding:8px 0; color:#0f172a;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; color:#475569;"><strong>Email</strong></td>
                <td style="padding:8px 0; color:#0f172a;">${safeEmail}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; color:#475569;"><strong>Sujet</strong></td>
                <td style="padding:8px 0; color:#0f172a;">${safeSubject}</td>
              </tr>
            </table>
            <div style="margin-top:14px; padding:14px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px;">
              <p style="margin:0 0 8px; font-size:13px; color:#475569;"><strong>Message</strong></p>
              <p style="margin:0; white-space:pre-line; line-height:1.6; color:#0f172a;">${safeMessage}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const ownerText = [
      "Nouvelle demande de contact",
      `Nom: ${cleanName}`,
      `Email: ${cleanEmail}`,
      `Sujet: ${cleanSubject}`,
      "",
      "Message:",
      cleanMessage,
    ].join("\n");

    const visitorHtml = `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px; color:#0f172a;">
        <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden;">
          <div style="padding:18px 22px; background:linear-gradient(135deg, #2563eb, #0ea5e9); color:#ffffff;">
            <h2 style="margin:0; font-size:20px;">Message bien recu</h2>
            <p style="margin:8px 0 0; font-size:13px; opacity:0.95;">Merci pour votre prise de contact</p>
          </div>
          <div style="padding:22px;">
            <p style="margin:0 0 10px; line-height:1.7;">Bonjour ${safeName},</p>
            <p style="margin:0 0 12px; line-height:1.7;">
              Merci pour votre message. Votre demande a ete transmise avec succes.
              Je reviendrai vers vous dans les meilleurs delais.
            </p>
            <div style="margin:14px 0; padding:14px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px;">
              <p style="margin:0 0 8px; font-size:13px; color:#475569;"><strong>Recapitulatif</strong></p>
              <p style="margin:0; line-height:1.6;"><strong>Sujet:</strong> ${safeSubject}</p>
              <p style="margin:8px 0 0; line-height:1.6;"><strong>Email:</strong> ${safeEmail}</p>
            </div>
            <p style="margin:0; line-height:1.7;">
              Cordialement,<br />
              <strong>DEKENI Toha</strong>
            </p>
          </div>
        </div>
      </div>
    `;

    const visitorText = [
      `Bonjour ${cleanName},`,
      "",
      "Merci pour votre message. Votre demande a ete recu et transmise avec succes.",
      "Je reviendrai vers vous dans les meilleurs delais.",
      "",
      `Recapitulatif: ${cleanSubject}`,
      "",
      "Cordialement,",
      "DEKENI Toha",
    ].join("\n");

    await Promise.all([
      transporter.sendMail({
        from: userEmail,
        to: userEmail,
        replyTo: cleanEmail,
        subject: `[Portfolio] Nouvelle demande - ${cleanSubject}`,
        text: ownerText,
        html: ownerHtml,
      }),
      transporter.sendMail({
        from: userEmail,
        to: cleanEmail,
        subject: "Confirmation de reception de votre message",
        text: visitorText,
        html: visitorHtml,
      }),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Votre message a ete envoye avec succes.",
        detail: "Une confirmation professionnelle vient de vous etre envoyee par email.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur API contact:", error);
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de l'envoi de votre message.",
        detail: "Veuillez reessayer dans quelques instants.",
      },
      { status: 500 }
    );
  }
}
