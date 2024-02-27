import { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: NextAuthOptions = { 
    providers: [
      CredentialsProvider({

        name: 'Credentials',

        credentials: {
          username: { label: "Username", type: "text", placeholder: "Username" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            if (credentials?.username != 'admin' || credentials?.password != 'password') { 
              return null
            }
     
            return { id: "1", username: credentials?.username } as User;
        },
      })
  ],
  secret: process.env.SECRET!,
}

const auth = NextAuth(authOptions);
export { auth as POST, auth as GET } 
