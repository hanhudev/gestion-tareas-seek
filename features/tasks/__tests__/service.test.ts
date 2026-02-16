import { taskService } from '../service'
import { CreateTaskInput, UpdateTaskInput } from '../types'

describe('Task Service', () => {
  describe('getTasks', () => {
    it('should return array of tasks', async () => {
      const tasks = await taskService.getTasks()
      
      expect(Array.isArray(tasks)).toBe(true)
      expect(tasks.length).toBeGreaterThan(0)
      expect(tasks[0]).toHaveProperty('id')
      expect(tasks[0]).toHaveProperty('title')
      expect(tasks[0]).toHaveProperty('status')
    })
  })

  describe('createTask', () => {
    it('should create a new task with generated ID', async () => {
      const input: CreateTaskInput = {
        title: 'New Task',
        description: 'Test description',
        status: 'pending',
      }

      const task = await taskService.createTask(input)

      expect(task).toHaveProperty('id')
      expect(task.title).toBe(input.title)
      expect(task.description).toBe(input.description)
      expect(task.status).toBe(input.status)
      expect(task).toHaveProperty('createdAt')
      expect(task).toHaveProperty('updatedAt')
    })

    it('should add task to the list', async () => {
      const initialTasks = await taskService.getTasks()
      const initialCount = initialTasks.length

      const input: CreateTaskInput = {
        title: 'Another Task',
        description: '',
        status: 'pending',
      }

      await taskService.createTask(input)
      const updatedTasks = await taskService.getTasks()

      expect(updatedTasks.length).toBe(initialCount + 1)
    })
  })

  describe('updateTask', () => {
    it('should update existing task', async () => {
      const tasks = await taskService.getTasks()
      const taskToUpdate = tasks[0]

      const update: UpdateTaskInput = {
        title: 'Updated Title',
        status: 'completed',
      }

      const updated = await taskService.updateTask(taskToUpdate.id, update)

      expect(updated).not.toBeNull()
      expect(updated?.title).toBe(update.title)
      expect(updated?.status).toBe(update.status)
      expect(updated?.updatedAt).toBeInstanceOf(Date)
    })

    it('should return null for non-existent task', async () => {
      const result = await taskService.updateTask('non-existent-id', { title: 'Test' })
      expect(result).toBeNull()
    })
  })

  describe('deleteTask', () => {
    it('should delete existing task', async () => {
      const tasks = await taskService.getTasks()
      const taskToDelete = tasks[0]
      const initialCount = tasks.length

      const result = await taskService.deleteTask(taskToDelete.id)

      expect(result).toBe(true)
      
      const updatedTasks = await taskService.getTasks()
      expect(updatedTasks.length).toBe(initialCount - 1)
    })

    it('should return false for non-existent task', async () => {
      const result = await taskService.deleteTask('non-existent-id')
      expect(result).toBe(false)
    })
  })
})
