import { prisma } from '@/common'
import bcrypt from 'bcrypt'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.debug('authorize:', credentials)
        const name = credentials?.username
        const password = credentials?.password || ''
        const user = await prisma.user.findUnique({ where: { name } })
        if (!user) {
          return null
        }
        if (bcrypt.compareSync(password, user.passwordHash)) {
          return { id: user.id }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async signIn(param) {
      console.debug('signIn:', param)
      return true
    },
    async session({ token, session }) {
      if (token.sub) {
        const user = await prisma.user.findUnique({ where: { id: token.sub } })
        if (user) {
          session.user.id = user.id
          session.user.name = user.name
          session.user.isAdmin = user.isAdmin
          console.debug('session.user:', session.user)
        }
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
