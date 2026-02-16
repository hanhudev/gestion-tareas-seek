import {
  TASK_STATUS_COLORS,
  TASK_STATUS_LABELS,
  TASK_STATUS_PRIORITY,
  DEFAULT_TASK_VALUES,
} from '../constants'

describe('Constantes de Tareas', () => {
  describe('Colores de Estado de Tarea', () => {
    it('debe tener colores para todos los tipos de estado', () => {
      expect(TASK_STATUS_COLORS).toHaveProperty('pending')
      expect(TASK_STATUS_COLORS).toHaveProperty('in-progress')
      expect(TASK_STATUS_COLORS).toHaveProperty('completed')
    })

    it('debe retornar clases tailwind como strings', () => {
      expect(typeof TASK_STATUS_COLORS.pending).toBe('string')
      expect(TASK_STATUS_COLORS.pending).toContain('yellow')
    })
  })

  describe('Etiquetas de Estado de Tarea', () => {
    it('debe tener etiquetas para todos los tipos de estado', () => {
      expect(TASK_STATUS_LABELS).toHaveProperty('pending')
      expect(TASK_STATUS_LABELS).toHaveProperty('in-progress')
      expect(TASK_STATUS_LABELS).toHaveProperty('completed')
    })

    it('debe tener etiquetas en español', () => {
      expect(TASK_STATUS_LABELS.pending).toBe('Pendiente')
      expect(TASK_STATUS_LABELS['in-progress']).toBe('En Progreso')
      expect(TASK_STATUS_LABELS.completed).toBe('Completada')
    })
  })

  describe('Prioridad de Estado de Tarea', () => {
    it('debe tener prioridades para todos los tipos de estado', () => {
      expect(TASK_STATUS_PRIORITY).toHaveProperty('pending')
      expect(TASK_STATUS_PRIORITY).toHaveProperty('in-progress')
      expect(TASK_STATUS_PRIORITY).toHaveProperty('completed')
    })

    it('debe tener orden de prioridad correcto', () => {
      expect(TASK_STATUS_PRIORITY['in-progress']).toBe(1)
      expect(TASK_STATUS_PRIORITY.pending).toBe(2)
      expect(TASK_STATUS_PRIORITY.completed).toBe(3)
    })
  })

  describe('Valores por Defecto de Tarea', () => {
    it('debe tener todos los campos requeridos', () => {
      expect(DEFAULT_TASK_VALUES).toHaveProperty('title')
      expect(DEFAULT_TASK_VALUES).toHaveProperty('description')
      expect(DEFAULT_TASK_VALUES).toHaveProperty('status')
    })

    it('debe tener valores por defecto correctos', () => {
      expect(DEFAULT_TASK_VALUES.title).toBe('')
      expect(DEFAULT_TASK_VALUES.description).toBe('')
      expect(DEFAULT_TASK_VALUES.status).toBe('pending')
    })
  })
})
