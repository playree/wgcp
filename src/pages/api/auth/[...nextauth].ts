import { prisma } from '@/common'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
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
          return user
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
    async session({ token, session, trigger }) {
      console.debug('session.trigger:', trigger)
      if (token.sub) {
        const user = await prisma.user.findUnique({ where: { id: token.sub } })
        if (user) {
          session.user.id = user.id
          session.user.isAdmin = user.isAdmin
          console.debug('session.user:', session.user)
        }
      }
      return session
    },
  },
})
