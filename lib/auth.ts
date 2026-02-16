import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

/**
 * Configuración de NextAuth con autenticación por credenciales
 * Usuario: admin, Contraseña: 123456
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = { id: "1", name: "Admin", email: "admin@test.com" }

        if (credentials?.username === "admin" && credentials?.password === "123456") {
            return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
