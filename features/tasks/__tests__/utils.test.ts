import { sortTasksByPriority, getStatusColor, getStatusLabel } from '../utils'
import { Task } from '../types'

describe('Task Utils', () => {
  describe('sortTasksByPriority', () => {
    it('should sort tasks by priority: in-progress > pending > completed', () => {
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          description: '',
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Task 2',
          description: '',
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          title: 'Task 3',
          description: '',
          status: 'in-progress',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      const sorted = sortTasksByPriority(tasks)

      expect(sorted[0].status).toBe('in-progress')
      expect(sorted[1].status).toBe('pending')
      expect(sorted[2].status).toBe('completed')
    })

    it('should not mutate the original array', () => {
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          description: '',
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      const original = [...tasks]
      sortTasksByPriority(tasks)

      expect(tasks).toEqual(original)
    })

    it('should handle empty array', () => {
      const sorted = sortTasksByPriority([])
      expect(sorted).toEqual([])
    })
  })

  describe('getStatusColor', () => {
    it('should return correct color classes for pending status', () => {
      const color = getStatusColor('pending')
      expect(color).toContain('yellow')
    })

    it('should return correct color classes for in-progress status', () => {
      const color = getStatusColor('in-progress')
      expect(color).toContain('blue')
    })

    it('should return correct color classes for completed status', () => {
      const color = getStatusColor('completed')
      expect(color).toContain('green')
    })
  })

  describe('getStatusLabel', () => {
    it('should return correct label for pending', () => {
      expect(getStatusLabel('pending')).toBe('Pendiente')
    })

    it('should return correct label for in-progress', () => {
      expect(getStatusLabel('in-progress')).toBe('En Progreso')
    })

    it('should return correct label for completed', () => {
      expect(getStatusLabel('completed')).toBe('Completada')
    })
  })
})
