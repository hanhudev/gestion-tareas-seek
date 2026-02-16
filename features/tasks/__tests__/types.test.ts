import { Task, TaskStatus, CreateTaskInput, UpdateTaskInput } from '../types'

describe('Tipos de Tareas', () => {
  describe('Tipo Task', () => {
    it('debe crear una tarea válida', () => {
      const task: Task = {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      expect(task.id).toBe('1')
      expect(task.title).toBe('Test Task')
      expect(task.status).toBe('pending')
    })

    it('debe permitir todos los estados válidos', () => {
      const statuses: TaskStatus[] = ['pending', 'in-progress', 'completed']

      statuses.forEach(status => {
        const task: Task = {
          id: '1',
          title: 'Test',
          description: '',
          status,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        expect(task.status).toBe(status)
      })
    })
  })

  describe('Tipo CreateTaskInput', () => {
    it('debe crear un input válido para crear tarea', () => {
      const input: CreateTaskInput = {
        title: 'New Task',
        description: 'New Description',
        status: 'pending',
      }

      expect(input.title).toBe('New Task')
      expect(input.status).toBe('pending')
    })

    it('debe permitir descripción opcional', () => {
      const input: CreateTaskInput = {
        title: 'Task',
        description: '',
        status: 'pending',
      }

      expect(input).toHaveProperty('title')
      expect(input).toHaveProperty('status')
    })
  })

  describe('Tipo UpdateTaskInput', () => {
    it('debe crear un input válido para actualizar tarea', () => {
      const input: UpdateTaskInput = {
        title: 'Updated',
        status: 'completed',
      }

      expect(input.title).toBe('Updated')
      expect(input.status).toBe('completed')
    })

    it('debe permitir actualizar solo título', () => {
      const input: UpdateTaskInput = {
        title: 'Only Title',
      }

      expect(input.title).toBe('Only Title')
      expect(input.status).toBeUndefined()
    })

    it('debe permitir actualizar solo estado', () => {
      const input: UpdateTaskInput = {
        status: 'in-progress',
      }

      expect(input.status).toBe('in-progress')
      expect(input.title).toBeUndefined()
    })

    it('debe permitir actualizar solo descripción', () => {
      const input: UpdateTaskInput = {
        description: 'New Description',
      }

      expect(input.description).toBe('New Description')
    })
  })
})
