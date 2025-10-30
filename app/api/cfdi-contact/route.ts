import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const EMAIL_TO = process.env.RESEND_CFDI_TO_EMAIL!;
const EMAIL_FROM = process.env.RESEND_CFDI_FROM_EMAIL!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body || {};
    if (!name || !email) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }
    const html = `<h2>Solicitud de CFDI vía formulario</h2>
<p><b>Nombre:</b> ${name}</p>
<p><b>Email:</b> ${email}</p>
${message ? `<p><b>Comentario:</b> ${message}</p>` : ""}`;

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [EMAIL_TO],
      subject: "[CFDI Donación] Interés en Factura CFDI",
      html,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    return NextResponse.json(
      { error: "Error procesando el formulario." },
      { status: 500 }
    );
  }
}
