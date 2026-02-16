import { APP_TITLE } from '../constants'
import { cn } from '../utils'
import { authOptions } from '../auth'

describe('lib - Funciones y constantes', () => {
  describe('Integración de constantes y utilidades', () => {
    it('debe tener APP_TITLE disponible', () => {
      expect(APP_TITLE).toBe('Gestor de Tareas')
    })

    it('debe poder combinar clases correctamente', () => {
      const result = cn('px-2', 'py-1', 'text-sm')
      expect(result).toContain('px-2')
      expect(result).toContain('py-1')
      expect(result).toContain('text-sm')
    })

    it('debe tener configuración de autenticación', () => {
      expect(authOptions).toBeDefined()
      expect(authOptions.pages?.signIn).toBe('/auth/login')
    })

    it('debe manejar clases tailwind conflicts', () => {
      const result = cn('p-2 p-4', 'text-red-500 text-blue-500')
      expect(typeof result).toBe('string')
    })
  })

  describe('Casos de uso combinados', () => {
    it('debe usar cn para construir clases de estilo', () => {
      const buttonClasses = cn(
        'px-4 py-2',
        'rounded-lg',
        'font-semibold',
        true && 'bg-blue-500',
        false && 'bg-red-500'
      )

      expect(buttonClasses).toContain('px-4')
      expect(buttonClasses).toContain('bg-blue-500')
      expect(buttonClasses).not.toContain('bg-red-500')
    })

    it('debe mantener la integridad de la configuración de auth', () => {
      expect(authOptions.providers).toBeDefined()
      expect(authOptions.providers.length).toBeGreaterThan(0)
      expect(authOptions.secret).toBe(process.env.NEXTAUTH_SECRET)
    })
  })
})
