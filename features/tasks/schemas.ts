import * as z from "zod"

/**
 * Schema de validación para tareas usando Zod
 * Centraliza la lógica de validación para reutilización en diferentes componentes
 */
export const taskSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string(),
  status: z.enum(["pending", "in-progress", "completed"]),
})

export type TaskSchemaType = z.infer<typeof taskSchema>
