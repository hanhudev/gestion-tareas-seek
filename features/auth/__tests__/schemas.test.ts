import { loginSchema } from '../schemas'

describe('Esquemas de Autenticación', () => {
  describe('loginSchema', () => {
    it('debe validar credenciales de login correctas', () => {
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

    it('debe rechazar ambos campos vacíos', () => {
      const invalidData = {
        username: '',
        password: '',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('debe aceptar cualquier usuario y contraseña no vacíos', () => {
      const testCases = [
        { username: 'user1', password: 'pass1' },
        { username: 'admin@test.com', password: 'securePassword123' },
        { username: 'test_user', password: '12345678' },
      ]

      testCases.forEach(data => {
        const result = loginSchema.safeParse(data)
        expect(result.success).toBe(true)
      })
    })
  })
})
