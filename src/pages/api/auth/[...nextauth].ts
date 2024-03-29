import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const prisma = new PrismaClient()

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

        // パスワード認証
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
  pages: {
    signIn: '/auth/signin',
  },
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
          session.user.isNotInit = user.isNotInit
          session.user.isAdmin = user.isAdmin
          session.user.email = user.email
          console.debug('session.user:', session.user)
        }
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
