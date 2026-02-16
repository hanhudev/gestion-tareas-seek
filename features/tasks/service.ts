import { Task, CreateTaskInput, UpdateTaskInput } from "./types"

// Mock de tareas
let tasks: Task[] = [
  {
    id: "1",
    title: "Implementar Autenticación",
    description: "Usar NextAuth para el login",
    status: "completed",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Crear Dashboard de Tareas",
    description: "Listar, crear, editar y eliminar tareas",
    status: "in-progress",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Aplicar estilos",
    description: "Usar Tailwind para estilizar la app",
    status: "completed",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Integrar con API real",
    description: "Integrar con API real para obtener tareas",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [...tasks]
  },

  createTask: async (input: CreateTaskInput): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    tasks.push(newTask)
    return newTask
  },

  updateTask: async (id: string, input: UpdateTaskInput): Promise<Task | null> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const index = tasks.findIndex((t) => t.id === id)
      if (index === -1) return null

      tasks[index] = {
          ...tasks[index],
          ...input,
          updatedAt: new Date()
      }
      return tasks[index]
  },

  deleteTask: async (id: string): Promise<boolean> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const initialLength = tasks.length
      tasks = tasks.filter(t => t.id !== id)
      return tasks.length < initialLength
  }
}
