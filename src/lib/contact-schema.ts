import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre no puede superar 100 caracteres.")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "El nombre solo puede contener letras."),

  email: z
    .string()
    .email("Ingresa un correo electrónico válido.")
    .max(255, "El correo no puede superar 255 caracteres."),

  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(2000, "El mensaje no puede superar 2000 caracteres."),
});

export type ContactData = z.infer<typeof contactSchema>;
