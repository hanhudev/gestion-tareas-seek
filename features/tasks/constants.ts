import { TaskStatus } from "./types"

/**
 * Mapeo de estados de tareas a clases de Tailwind para estilos
 */
export const TASK_STATUS_COLORS: Record<TaskStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
}

/**
 * Mapeo de estados de tareas a etiquetas legibles en español
 */
export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "Pendiente",
  "in-progress": "En Progreso",
  completed: "Completada",
}

/**
 * Prioridades de estados para ordenamiento (menor = mayor prioridad)
 */
export const TASK_STATUS_PRIORITY: Record<TaskStatus, number> = {
  "in-progress": 1,
  pending: 2,
  completed: 3,
}

/**
 * Valores predeterminados para formularios de tareas
 */
export const DEFAULT_TASK_VALUES = {
  title: "",
  description: "",
  status: "pending" as TaskStatus,
}
