import { taskSchema } from '../schemas'

describe('Esquema de Tarea - Pruebas Adicionales', () => {
  it('debe validar una tarea completa', () => {
    const validTask = {
      title: 'Implementar Autenticación',
      description: 'Usar NextAuth para el login',
      status: 'in-progress' as const,
    }

    const result = taskSchema.safeParse(validTask)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.title).toBe('Implementar Autenticación')
      expect(result.data.status).toBe('in-progress')
    }
  })

  it('debe validar una tarea con descripción vacía', () => {
    const task = {
      title: 'Tarea Simple',
      description: '',
      status: 'pending' as const,
    }

    const result = taskSchema.safeParse(task)
    expect(result.success).toBe(true)
  })

  it('debe rechazar tarea con estado inválido', () => {
    const task = {
      title: 'Tarea',
      description: 'Descripción',
      status: 'invalid-status',
    }

    const result = taskSchema.safeParse(task)
    expect(result.success).toBe(false)
  })

  it('debe rechazar tarea con título muy largo vacío', () => {
    const task = {
      title: '',
      status: 'pending' as const,
    }

    const result = taskSchema.safeParse(task)
    expect(result.success).toBe(false)
  })

  it('debe ser lenient con diferentes tipos de espacios', () => {
    const task = {
      title: 'Tarea',
      description: 'Descripción con\n\nsaltos de línea',
      status: 'completed' as const,
    }

    const result = taskSchema.safeParse(task)
    expect(result.success).toBe(true)
  })
})
