import { APP_TITLE } from '../constants'

describe('lib/constants', () => {
  it('debe exportar APP_TITLE', () => {
    expect(APP_TITLE).toBeDefined()
    expect(typeof APP_TITLE).toBe('string')
  })

  it('debe tener valor correcto de APP_TITLE', () => {
    expect(APP_TITLE).toBe('Gestor de Tareas')
  })

  it('debe ser una cadena no vacía', () => {
    expect(APP_TITLE.length).toBeGreaterThan(0)
  })
})
