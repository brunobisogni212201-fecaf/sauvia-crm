import NextAuth, { NextAuthOptions } from 'next-auth'
import CognitoProvider from 'next-auth/providers/cognito'

export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID || '',
      clientSecret: process.env.COGNITO_CLIENT_SECRET || '',
      idToken: true,
      wellKnown: `https://cognito-idp.${process.env.COGNITO_REGION || 'us-east-1'}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/openid-configuration`,
      authorization: { params: { scope: 'email openid profile' } },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        token.id = profile.sub || ''
        token.cognitoId = profile.sub || ''
        token.email = profile.email || ''
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.cognitoId = token.cognitoId as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }