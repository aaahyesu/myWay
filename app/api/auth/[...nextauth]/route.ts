import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import prisma from "@/app/lib/prisma";

// User 타입 정의
type User = {
  id: string;
  email: string;
  name: string | null;
};

const handler = NextAuth({
  pages: {
    signIn: "",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile): Promise<User> {
        const email = profile.email ?? "";
        const name = profile.name ?? `user-${profile.sub}`;
        const user = await prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            email,
            name,
          },
        });
        return { id: user.id.toString(), email: user.email, name: user.name };
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      async profile(profile): Promise<User> {
        // 카카오 프로필 정보를 콘솔에 출력
        console.log("KaKao profile:", profile);

        // 카카오 프로필에서 필요한 정보를 추출(카카오는 이메일 X)
        const email = profile.kakao_account.email ?? "";
        const name =
          profile.properties.nickname ??
          profile.kakao_account.profile.nickname ??
          `user-${profile.id}`;

        const user = await prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            email,
            name,
          },
        });
        return { id: user.id.toString(), email: user.email, name: user.name };
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      async profile(profile): Promise<User> {
        // 네이버 프로필 정보를 콘솔에 출력
        console.log("Naver profile:", profile);

        // 네이버 프로필에서 필요한 정보를 추출
        const email = profile.response.email ?? "";
        const name = profile.response.name ?? `user-${profile.response.id}`;

        const user = await prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            email,
            name,
          },
        });
        return { id: user.id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
