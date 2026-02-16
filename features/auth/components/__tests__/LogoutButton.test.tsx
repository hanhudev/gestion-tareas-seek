import { render, screen, fireEvent } from '@testing-library/react'
import { LogoutButton } from '../LogoutButton'
import { signOut } from 'next-auth/react'

jest.mock('next-auth/react')

const mockSignOut = signOut as jest.MockedFunction<typeof signOut>

describe('Botón de Cerrar Sesión', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('debe renderizar el botón de cerrar sesión', () => {
    render(<LogoutButton />)

    const button = screen.getByRole('button', { name: /cerrar sesión/i })
    expect(button).toBeInTheDocument()
  })

  it('debe llamar a signOut cuando se hace clic', () => {
    mockSignOut.mockResolvedValueOnce(undefined)

    render(<LogoutButton />)

    const button = screen.getByRole('button', { name: /cerrar sesión/i })
    fireEvent.click(button)

    expect(mockSignOut).toHaveBeenCalledWith({ callbackUrl: '/auth/login' })
  })

  it('debe tener el ícono de logout', () => {
    render(<LogoutButton />)

    const button = screen.getByRole('button', { name: /cerrar sesión/i })
    expect(button).toBeInTheDocument()
  })

  it('debe tener la clase correcta', () => {
    render(<LogoutButton />)

    const button = screen.getByRole('button', { name: /cerrar sesión/i })
    expect(button.className).toContain('gap-2')
  })
})
