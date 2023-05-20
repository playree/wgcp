import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      isAdmin: boolean
      email?: string | null
    }
  }
}
