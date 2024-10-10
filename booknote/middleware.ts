import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, _: NextFetchEvent) {
  const url = req.nextUrl.clone();
  const redirectTo = (dest: string) => NextResponse.redirect(new URL(dest, url));
  
  // 토큰 가져오기
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET, 
    raw: false  // 디코딩된 정보를 반환
  });

  console.log(url.pathname)
  // 보호 경로 리스트
  const variable_path_list = ["/book", "/profile","/history"];

  try {
    if (token) {
      // 이미 로그인한 사용자가 '/'나 보호된 경로 외에 접근할 경우 '/book'으로 리디렉션
      if (url.pathname === '/' || !variable_path_list.includes(url.pathname)) {
        return redirectTo('/book');
      }
    }

    // 토큰이 없으면 로그인 페이지로 리디렉션
    if (!token) {
      return redirectTo('/login');
    }
    
  } catch (e) {
    console.error("Error decoding token:", e);
  }

  // 기본적으로 요청을 통과시킴
  return NextResponse.next();
};

// 미들웨어가 실행될 경로를 설정
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
