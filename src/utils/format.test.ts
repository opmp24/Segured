import { describe, it, expect } from 'vitest'

describe('format utilities', () => {
  it('formats currency correctly (CLP)', () => {
    const formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    })
    expect(formatter.format(15000)).toBe('$15.000')
  })

  it('formats dates correctly', () => {
    const date = new Date('2024-01-15')
    const formatter = new Intl.DateTimeFormat('es-CL', {
      dateStyle: 'long',
    })
    expect(formatter.format(date)).toBe('15 de enero de 2024')
  })
})
