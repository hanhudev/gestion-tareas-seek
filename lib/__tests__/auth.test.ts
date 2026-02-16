import { authOptions } from '../auth'

describe('lib/auth', () => {
  it('debe exportar authOptions', () => {
    expect(authOptions).toBeDefined()
    expect(typeof authOptions).toBe('object')
  })

  it('debe tener proveedor de Credentials configurado', () => {
    expect(authOptions.providers).toBeDefined()
    expect(authOptions.providers.length).toBeGreaterThan(0)

    const credentialsProvider = authOptions.providers[0]
    expect(credentialsProvider.id).toBe('credentials')
  })

  it('debe tener página de login configurada', () => {
    expect(authOptions.pages).toBeDefined()
    expect(authOptions.pages?.signIn).toBe('/auth/login')
  })

  it('debe tener secret configurado', () => {
    expect(authOptions.secret).toBe(process.env.NEXTAUTH_SECRET)
  })

  describe('Configuración del proveedor', () => {
    it('debe existir el proveedor de Credentials', () => {
      const provider = authOptions.providers[0]
      expect(provider).toBeDefined()
    })

    it('debe tener authorize como función', () => {
      const provider = authOptions.providers[0]
      if (provider && 'authorize' in provider) {
        expect(typeof provider.authorize).toBe('function')
      }
    })

    it('debe tener id credentials', () => {
      const provider = authOptions.providers[0]
      expect(provider.id).toBe('credentials')
    })

    it('debe tener name Credentials', () => {
      const provider = authOptions.providers[0]
      expect(provider.name).toBe('Credentials')
    })

    it('debe retornar null para credenciales inválidas', async () => {
      const provider = authOptions.providers[0]
      if (provider && 'authorize' in provider) {
        const user = await provider.authorize(
          { username: 'wrong', password: 'wrong' },
          { headers: {}, body: undefined, query: {}, method: 'POST' }
        )
        expect(user).toBeNull()
      }
    })
  })
})
