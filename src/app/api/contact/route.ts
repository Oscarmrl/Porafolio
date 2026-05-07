import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { contactSchema } from "@/lib/contact-schema";

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(100)  NOT NULL,
      email      VARCHAR(255)  NOT NULL,
      message    TEXT          NOT NULL,
      created_at TIMESTAMPTZ   DEFAULT NOW()
    )
  `);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json({ error: errors }, { status: 422 });
    }

    const { name, email, message } = result.data;

    await ensureTable();

    await pool.query(
      "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
