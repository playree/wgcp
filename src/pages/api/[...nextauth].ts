import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'UserID / Password',
      credentials: {
        username: { label: 'ユーザー名', type: 'text', placeholder: 'ユーザー名' },
        password: { label: 'パスワード', type: 'password' },
      },
      async authorize() {
        return null
      },
    }),
  ],
})
