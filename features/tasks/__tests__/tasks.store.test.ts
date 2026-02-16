import { renderHook, act, waitFor } from '@testing-library/react'
import { useTasksStore } from '../store/tasks.store'
import { createTaskAction, updateTaskAction, deleteTaskAction } from '../actions'

// Mock the server actions
jest.mock('../actions', () => ({
  createTaskAction: jest.fn(),
  updateTaskAction: jest.fn(),
  deleteTaskAction: jest.fn(),
}))

describe('useTasksStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useTasksStore())
    act(() => {
      result.current.setTasks([])
    })
    jest.clearAllMocks()
  })

  describe('setTasks', () => {
    it('debe establecer tareas', () => {
      const { result } = renderHook(() => useTasksStore())
      
      const mockTasks = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test',
          status: 'pending' as const,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      act(() => {
        result.current.setTasks(mockTasks)
      })

      expect(result.current.tasks).toEqual(mockTasks)
    })
  })

  describe('addTask', () => {
    it('debe agregar tarea de forma optimista', async () => {
      const { result } = renderHook(() => useTasksStore())
      
      const mockCreatedTask = {
        id: 'server-id',
        title: 'New Task',
        description: 'Description',
        status: 'pending' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      (createTaskAction as jest.Mock).mockResolvedValueOnce(mockCreatedTask)

      await act(async () => {
        await result.current.addTask({
          title: 'New Task',
          description: 'Description',
          status: 'pending',
        })
      })

      await waitFor(() => {
        expect(result.current.tasks.length).toBe(1)
        expect(result.current.tasks[0].id).toBe('server-id')
      })
    })

    it('debe revertir en caso de error', async () => {
      const { result } = renderHook(() => useTasksStore())
      
      const initialTask = {
        id: '1',
        title: 'Existing',
        description: '',
        status: 'pending' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      act(() => {
        result.current.setTasks([initialTask])
      })

      ;(createTaskAction as jest.Mock).mockRejectedValueOnce(new Error('Server error'))

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      await act(async () => {
        await result.current.addTask({
          title: 'New Task',
          description: '',
          status: 'pending',
        })
      })

      consoleErrorSpy.mockRestore()

      await waitFor(() => {
        expect(result.current.tasks).toEqual([initialTask])
      })
    })
  })

  describe('updateTask', () => {
    it('debe actualizar tarea de forma optimista', async () => {
      const { result } = renderHook(() => useTasksStore())
      
      const initialTask = {
        id: '1',
        title: 'Initial',
        description: '',
        status: 'pending' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      act(() => {
        result.current.setTasks([initialTask])
      })

      ;(updateTaskAction as jest.Mock).mockResolvedValueOnce({})

      await act(async () => {
        await result.current.updateTask('1', { title: 'Updated' })
      })

      await waitFor(() => {
        expect(result.current.tasks[0].title).toBe('Updated')
      })
    })

    it('debe revertir en error de actualización', async () => {
      const { result } = renderHook(() => useTasksStore())
      
      const initialTask = {
        id: '1',
        title: 'Initial',
        description: '',
        status: 'pending' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      act(() => {
        result.current.setTasks([initialTask])
      })

      ;(updateTaskAction as jest.Mock).mockRejectedValueOnce(new Error('Error'))

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      await act(async () => {
        await result.current.updateTask('1', { title: 'Updated' })
      })

      consoleErrorSpy.mockRestore()

      await waitFor(() => {
        expect(result.current.tasks[0].title).toBe('Initial')
      })
    })
  })

  describe('deleteTask', () => {
    it('debe eliminar tarea de forma optimista', async () => {
      const { result } = renderHook(() => useTasksStore())
      
      const task = {
        id: '1',
        title: 'Task',
        description: '',
        status: 'pending' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      act(() => {
        result.current.setTasks([task])
      })

      ;(deleteTaskAction as jest.Mock).mockResolvedValueOnce(true)

      await act(async () => {
        await result.current.deleteTask('1')
      })

      await waitFor(() => {
        expect(result.current.tasks.length).toBe(0)
      })
    })

    it('debe revertir en error de eliminación', async () => {
      const { result } = renderHook(() => useTasksStore())
      
      const task = {
        id: '1',
        title: 'Task',
        description: '',
        status: 'pending' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      act(() => {
        result.current.setTasks([task])
      })

      ;(deleteTaskAction as jest.Mock).mockRejectedValueOnce(new Error('Error'))

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      await act(async () => {
        await result.current.deleteTask('1')
      })

      consoleErrorSpy.mockRestore()

      await waitFor(() => {
        expect(result.current.tasks).toEqual([task])
      })
    })
  })
})
