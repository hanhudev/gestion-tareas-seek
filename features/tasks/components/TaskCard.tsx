"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Task } from "../types"
import { Pencil, Trash2 } from "lucide-react"
import { useTasksStore } from "../store/tasks.store"
import { useState, memo } from "react"
import { TaskForm } from "./TaskForm"

interface TaskCardProps {
  task: Task
}

export const TaskCard = memo(function TaskCard({ task }: TaskCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const deleteTask = useTasksStore(state => state.deleteTask)

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      setIsDeleting(true)
      await deleteTask(task.id)
      setIsDeleting(false)
    }
  }

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  }

  const statusLabels = {
    pending: "Pendiente",
    "in-progress": "En Progreso",
    completed: "Completada",
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold">{task.title}</CardTitle>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[task.status]}`}>
            {statusLabels[task.status]}
          </span>
        </CardHeader>
        <CardContent className="space-y-2">
          {task.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {task.description}
            </p>
          )}
          <p className="text-xs text-gray-400">
            Actualizado: {new Date(task.updatedAt).toLocaleDateString()}
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsEditOpen(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete} disabled={isDeleting}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </CardFooter>
      </Card>
      <TaskForm task={task} open={isEditOpen} onOpenChange={setIsEditOpen} />
    </>
  )
})
