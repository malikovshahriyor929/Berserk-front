import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
//@ts-ignore
import { env } from '@/env.mjs';
import { pagesOptions } from './pages-options';

const BERSERK_API =
  (process.env.NEXT_PUBLIC_BERSERK_API_URL || 'http://localhost:5050').replace(/\/+$/, '');

export const authOptions: NextAuthOptions = {
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email as string;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${BERSERK_API}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({ message: '' })) as { message?: string };
            throw new Error(err?.message || "Email yoki parol noto'g'ri");
          }

          type UserDto = { id: string; email: string; name: string; role: string };
          type Tokens = { accessToken: string; refreshToken: string };
          const data = await res.json() as {
            userdto?: UserDto; tokens?: Tokens;
            data?: { accessToken: string; refreshToken: string; user: UserDto };
            accessToken?: string; refreshToken?: string; user?: UserDto;
          };

          // Support { userdto, tokens } shape (current backend)
          const user: UserDto | undefined = data.userdto ?? data.data?.user ?? data.user;
          const accessToken: string | undefined = data.tokens?.accessToken ?? data.data?.accessToken ?? data.accessToken;
          const refreshToken: string = data.tokens?.refreshToken ?? data.data?.refreshToken ?? data.refreshToken ?? '';

          if (!accessToken || !user) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role ?? 'USER',
            accessToken,
            refreshToken,
          };
        } catch (err: any) {
          throw new Error(`${err?.message || 'Login amalga oshmadi'} (URL: ${BERSERK_API})`);
        }
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};
