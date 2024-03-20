import { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.clientId as string,
      clientSecret: process.env.clientSecret as string,
      
    }),
  ],
};