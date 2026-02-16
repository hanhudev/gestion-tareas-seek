import { Task, TaskStatus } from "./types"
import { TASK_STATUS_COLORS, TASK_STATUS_LABELS, TASK_STATUS_PRIORITY } from "./constants"

/**
 * Ordena tareas por prioridad de estado
 * Orden: En Progreso → Pendiente → Completada
 * 
 * @param {Task[]} tasks - Array de tareas a ordenar
 * @returns {Task[]} Nuevo array ordenado (no muta el original)
 */
export function sortTasksByPriority(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const priorityA = TASK_STATUS_PRIORITY[a.status] || 99
    const priorityB = TASK_STATUS_PRIORITY[b.status] || 99
    return priorityA - priorityB
  })
}

export function getStatusColor(status: TaskStatus): string {
  return TASK_STATUS_COLORS[status]
}

export function getStatusLabel(status: TaskStatus): string {
  return TASK_STATUS_LABELS[status]
}
