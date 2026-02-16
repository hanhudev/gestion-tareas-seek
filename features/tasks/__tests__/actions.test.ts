import { getTasksAction, createTaskAction, updateTaskAction, deleteTaskAction } from '../actions'
import { taskService } from '../service'
import { CreateTaskInput, UpdateTaskInput } from '../types'

// Mock next/cache para evitar problemas de servidor
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

jest.mock('../service')

const mockTaskService = taskService as jest.Mocked<typeof taskService>

describe('Acciones de Tareas', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getTasksAction', () => {
    it('debe retornar tareas desde el servicio', async () => {
      const mockTasks = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          status: 'pending' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      mockTaskService.getTasks.mockResolvedValueOnce(mockTasks)

      const result = await getTasksAction()

      expect(result).toEqual(mockTasks)
      expect(mockTaskService.getTasks).toHaveBeenCalledTimes(1)
    })

    it('debe manejar errores del servicio', async () => {
      const error = new Error('Service error')
      mockTaskService.getTasks.mockRejectedValueOnce(error)

      await expect(getTasksAction()).rejects.toThrow('Service error')
    })
  })

  describe('createTaskAction', () => {
    it('debe crear una nueva tarea', async () => {
      const input: CreateTaskInput = {
        title: 'New Task',
        description: 'New Description',
        status: 'pending',
      }

      const mockCreatedTask = {
        id: '1',
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockTaskService.createTask.mockResolvedValueOnce(mockCreatedTask)

      const result = await createTaskAction(input)

      expect(result).toEqual(mockCreatedTask)
      expect(mockTaskService.createTask).toHaveBeenCalledWith(input)
    })

    it('debe manejar errores del servicio al crear', async () => {
      const input: CreateTaskInput = {
        title: 'Task',
        description: '',
        status: 'pending',
      }

      mockTaskService.createTask.mockRejectedValueOnce(new Error('Creation failed'))

      await expect(createTaskAction(input)).rejects.toThrow('Creation failed')
    })
  })

  describe('updateTaskAction', () => {
    it('debe actualizar una tarea existente', async () => {
      const input: UpdateTaskInput = {
        title: 'Updated Title',
        status: 'completed',
      }

      const mockUpdatedTask = {
        id: '1',
        title: 'Updated Title',
        description: 'Description',
        status: 'completed' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockTaskService.updateTask.mockResolvedValueOnce(mockUpdatedTask)

      const result = await updateTaskAction('1', input)

      expect(result).toEqual(mockUpdatedTask)
      expect(mockTaskService.updateTask).toHaveBeenCalledWith('1', input)
    })

    it('debe manejar errores al actualizar', async () => {
      const input: UpdateTaskInput = { title: 'Updated' }

      mockTaskService.updateTask.mockRejectedValueOnce(new Error('Update failed'))

      await expect(updateTaskAction('1', input)).rejects.toThrow('Update failed')
    })

    it('debe retornar null cuando la tarea no existe', async () => {
      const input: UpdateTaskInput = { title: 'Updated' }

      mockTaskService.updateTask.mockResolvedValueOnce(null)

      const result = await updateTaskAction('non-existent', input)

      expect(result).toBeNull()
    })
  })

  describe('deleteTaskAction', () => {
    it('debe eliminar una tarea existente', async () => {
      mockTaskService.deleteTask.mockResolvedValueOnce(true)

      const result = await deleteTaskAction('1')

      expect(result).toBe(true)
      expect(mockTaskService.deleteTask).toHaveBeenCalledWith('1')
    })

    it('debe retornar false cuando la tarea no existe', async () => {
      mockTaskService.deleteTask.mockResolvedValueOnce(false)

      const result = await deleteTaskAction('non-existent')

      expect(result).toBe(false)
    })

    it('debe manejar errores al eliminar', async () => {
      mockTaskService.deleteTask.mockRejectedValueOnce(new Error('Delete failed'))

      await expect(deleteTaskAction('1')).rejects.toThrow('Delete failed')
    })
  })
})
