import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      cognitoId: string
      email: string
      name?: string | null
      image?: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    cognitoId: string
    email: string
  }
}