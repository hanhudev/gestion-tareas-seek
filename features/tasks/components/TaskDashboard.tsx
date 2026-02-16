"use client"

import { useEffect, useState, memo, useCallback } from "react"
import { Task } from "../types"
import { TaskCard } from "./TaskCard"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskForm } from "./TaskForm"
import { useTasksStore } from "../store/tasks.store"

interface TaskDashboardProps {
  tasks: Task[]
}

const TaskDashboardHeader = memo(function TaskDashboardHeader({ onOpenCreate }: { onOpenCreate: () => void }) {
  return (
    <div className="flex justify-end items-center">
      <Button onClick={onOpenCreate} className="w-full sm:w-auto">
        <Plus className="mr-2 h-4 w-4" /> Nueva Tarea
      </Button>
    </div>
  )
})

export function TaskDashboard({ tasks: initialTasks }: TaskDashboardProps) {
  const { tasks, setTasks } = useTasksStore()
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks, setTasks])

  const handleOpenCreate = useCallback(() => setIsCreateOpen(true), [])

  const sortedTasks = [...tasks].sort((a, b) => {
    const priority = {
      "in-progress": 1,
      "pending": 2,
      "completed": 3
    }
    return (priority[a.status] || 99) - (priority[b.status] || 99)
  })

  return (
    <div className="space-y-6">
      <TaskDashboardHeader onOpenCreate={handleOpenCreate} />

      {sortedTasks.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No hay tareas. ¡Crea una nueva!
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-1">
          {sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      <TaskForm open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  )
}
