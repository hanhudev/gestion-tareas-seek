"use server"

import { revalidatePath } from "next/cache"
import { taskService } from "./service"
import { CreateTaskInput, UpdateTaskInput } from "./types"

export async function getTasksAction() {
  return await taskService.getTasks()
}

export async function createTaskAction(input: CreateTaskInput) {
  const task = await taskService.createTask(input)
  revalidatePath("/")
  return task
}

export async function updateTaskAction(id: string, input: UpdateTaskInput) {
  const task = await taskService.updateTask(id, input)
  revalidatePath("/")
  return task
}

export async function deleteTaskAction(id: string) {
  const success = await taskService.deleteTask(id)
  revalidatePath("/")
  return success
}
