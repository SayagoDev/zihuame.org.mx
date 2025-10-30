import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY!);
const EMAIL_TO = (
  process.env.RESEND_CONTACT_TO_EMAIL || process.env.RESEND_CFDI_TO_EMAIL!
).split(",");
const EMAIL_FROM = process.env.RESEND_CONTACT_FROM_EMAIL!;

const ContactSchema = z.object({
  name: z.string().min(2, "Nombre requerido, mínimo 2 caracteres"),
  email: z.email({ error: "Correo electrónico inválido" }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[\d\s+()-]{6,20}$/.test(val), {
      message: "Teléfono inválido",
    }),
  message: z.string().min(10, "Mensaje mínimo de 10 caracteres"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parse = ContactSchema.safeParse(body);
    if (!parse.success) {
      // Saca el primer error
      const errs = parse.error.flatten().fieldErrors;
      let errorMsg =
        errs.name?.[0] ||
        errs.email?.[0] ||
        errs.phone?.[0] ||
        errs.message?.[0] ||
        "Datos inválidos";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }
    const { name, email, message, phone } = parse.data;

    const html = `<h2>Alguien contactó a través de zihuame.org.mx</h2>
<p><b>Nombre:</b> ${name}</p>
<p><b>Email:</b> ${email}</p>
${phone ? `<p><b>Teléfono:</b> ${phone}</p>` : ""}
${message ? `<p><b>Mensaje:</b> ${message}</p>` : ""}`;

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO!,
      subject: "[Contacto] Nuevo mensaje del sitio web",
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
