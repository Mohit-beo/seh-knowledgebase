import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const db = await connectDB();
        const user = await db
          .collection("users")
          .findOne({ email: credentials?.email });

        if (!user || !user.approved) return null;

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
  async session({ session, token }) {
    if (session.user) {
      session.user.role = token.role as string;
    }
    return session;
  },

  async jwt({ token, user }) {
    if (user) {
      token.role = user.role;
    }
    return token;
  },
},
});

export { handler as GET, handler as POST };
