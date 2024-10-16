import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest, _: NextFetchEvent) {
  const url = req.nextUrl.clone();
  const redirectTo = (dest: string) => NextResponse.redirect(new URL(dest, url));
  
  // 토큰 가져오기
  const access_token=cookies().get("access_token")?.value!
  const refresh_token=cookies().get("refresh_token")?.value!

  console.log(url.pathname)
  // 보호 경로 리스트
  
  const variable_path_list = ["/book", "/profile","/history"];

  try {
    if (access_token&&refresh_token) {
      // 이미 로그인한 사용자가 '/'나 보호된 경로 외에 접근할 경우 '/book'으로 리디렉션
      if (url.pathname === '/' || !variable_path_list.includes(url.pathname)) {
        return redirectTo('/book');
      }
    }

    // 토큰이 없으면 로그인 페이지로 리디렉션
    if (!(access_token&&refresh_token) && url.pathname !== '/login') {
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
