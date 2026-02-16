import * as z from "zod"

/**
 * Schema de validación para el formulario de login
 * Centraliza la lógica de validación de autenticación
 */
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "El usuario es requerido."),
  password: z
    .string()
    .min(1, "La contraseña es requerida."),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
