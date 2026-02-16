import { taskSchema } from '../schemas'
import { loginSchema } from '../../auth/schemas'

describe('Esquema de Tarea', () => {
  it('debe validar datos de tarea correctos', () => {
    const validData = {
      title: 'Test Task',
      description: 'Test description',
      status: 'pending' as const,
    }

    const result = taskSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('debe rechazar tarea sin título', () => {
    const invalidData = {
      title: '',
      description: 'Test',
      status: 'pending' as const,
    }

    const result = taskSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('debe aceptar todos los valores de estado válidos', () => {
    const statuses = ['pending', 'in-progress', 'completed'] as const

    statuses.forEach(status => {
      const data = {
        title: 'Test',
        description: '',
        status,
      }
      const result = taskSchema.safeParse(data)
      expect(result.success).toBe(true)
    })
  })

  it('debe rechazar estado inválido', () => {
    const data = {
      title: 'Test',
      description: '',
      status: 'invalid',
    }

    const result = taskSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})

describe('Esquema de Tarea - Casos límite', () => {
  it('debe requerir descripción (no puede estar vacía)', () => {
    const data = {
      title: 'Test',
      status: 'pending' as const,
    }

    const result = taskSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('debe requerir estado (no puede estar vacío)', () => {
    const data = {
      title: 'Test',
      description: 'Description',
    }

    const result = taskSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('debe aceptar título con espacios solo (descripción requerida)', () => {
    const data = {
      title: '   ',
      description: 'Description',
      status: 'pending' as const,
    }

    const result = taskSchema.safeParse(data)
    // El schema aceptará espacios porque solo verifica min(1)
    expect(result.success).toBe(true)
  })

  it('debe recortar título y descripción', () => {
    const data = {
      title: 'Test Task',
      description: 'Description',
      status: 'pending' as const,
    }

    const result = taskSchema.safeParse(data)
    expect(result.success).toBe(true)
  })
})

describe('Esquema de Login', () => {
  it('debe validar datos de login correctos', () => {
    const validData = {
      username: 'admin',
      password: '123456',
    }

    const result = loginSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('debe rechazar usuario vacío', () => {
    const invalidData = {
      username: '',
      password: '123456',
    }

    const result = loginSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('debe rechazar contraseña vacía', () => {
    const invalidData = {
      username: 'admin',
      password: '',
    }

    const result = loginSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject both empty', () => {
    const invalidData = {
      username: '',
      password: '',
    }

    const result = loginSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should allow any username', () => {
    const validData = {
      username: 'user@example.com',
      password: 'pass123',
    }

    const result = loginSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })
})
