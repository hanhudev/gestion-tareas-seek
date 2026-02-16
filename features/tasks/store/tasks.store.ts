import { create } from "zustand"
import { Task, CreateTaskInput, UpdateTaskInput } from "../types"
import { createTaskAction, deleteTaskAction, updateTaskAction } from "../actions"

interface TasksState {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (input: CreateTaskInput) => Promise<void>
  updateTask: (id: string, input: UpdateTaskInput) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  
  addTask: async (input) => {
    const tempId = Math.random().toString(36).substring(2, 9)
    const optimisticTask: Task = {
      id: tempId,
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: input.status || "pending"
    }
    
    const currentTasks = get().tasks
    set({ tasks: [...currentTasks, optimisticTask] })

    try {
      const realTask = await createTaskAction(input)
      set(state => ({
        tasks: state.tasks.map(t => t.id === tempId ? realTask : t)
      }))
    } catch (error) {
      console.error("Failed to add task", error)
      set({ tasks: currentTasks })
    }
  },

  updateTask: async (id, input) => {
    const currentTasks = get().tasks
    set(state => ({
      tasks: state.tasks.map(t => 
        t.id === id ? { ...t, ...input, updatedAt: new Date() } : t
      )
    }))

    try {
      await updateTaskAction(id, input)
    } catch (error) {
      console.error("Failed to update task", error)
      set({ tasks: currentTasks })
    }
  },

  deleteTask: async (id) => {
    const currentTasks = get().tasks
    set(state => ({
      tasks: state.tasks.filter(t => t.id !== id)
    }))

    try {
      await deleteTaskAction(id)
    } catch (error) {
      console.error("Failed to delete task", error)
      set({ tasks: currentTasks })
    }
  }
}))
