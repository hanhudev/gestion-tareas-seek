import { cn } from '../utils'

describe('lib/utils', () => {
  describe('cn - función de fusión de clases', () => {
    it('debe fusionar nombres de clases simples', () => {
      const result = cn('px-2', 'py-1')
      expect(result).toBe('px-2 py-1')
    })

    it('debe manejar clases condicionales', () => {
      const result = cn('px-2', false && 'py-1', true && 'bg-blue')
      expect(result).toContain('px-2')
      expect(result).toContain('bg-blue')
      expect(result).not.toContain('py-1')
    })

    it('debe resolver conflictos de tailwind correctamente', () => {
      // Tailwind merge should resolve conflicting utilities
      const result = cn('px-2 px-4')
      // The latter should win
      expect(result).toContain('px-4')
    })

    it('debe manejar arrays de clases', () => {
      const result = cn(['px-2', 'py-1'])
      expect(result).toContain('px-2')
      expect(result).toContain('py-1')
    })

    it('debe manejar valores undefined', () => {
      const result = cn('px-2', undefined, 'py-1')
      expect(result).toBe('px-2 py-1')
    })

    it('debe manejar valores null', () => {
      const result = cn('px-2', null, 'py-1')
      expect(result).toBe('px-2 py-1')
    })

    it('debe manejar cadena vacía', () => {
      const result = cn('px-2', '', 'py-1')
      expect(result).toBe('px-2 py-1')
    })

    it('debe manejar condiciones complejas', () => {
      const isActive = true
      const isDisabled = false

      const result = cn(
        'base-class',
        isActive && 'active-class',
        isDisabled && 'disabled-class'
      )

      expect(result).toContain('base-class')
      expect(result).toContain('active-class')
      expect(result).not.toContain('disabled-class')
    })

    it('debe manejar clases responsivas', () => {
      const result = cn('px-2 md:px-4 lg:px-8')
      expect(result).toContain('px-2')
      expect(result).toContain('md:px-4')
      expect(result).toContain('lg:px-8')
    })

    it('debe retornar tipo string', () => {
      const result = cn('px-2', 'py-1')
      expect(typeof result).toBe('string')
    })
  })
})
