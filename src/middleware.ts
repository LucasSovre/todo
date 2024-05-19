import type { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    const isPrivate = request.nextUrl.pathname.startsWith("/private")
    if(isPrivate){
        return privateMiddleware(request)
    }
}

function privateMiddleware(request: NextRequest){
    const token = request.cookies.get("token")
    if(token === undefined){
        return new Response("Not Authenticated", {status : 401})
    }
}

export const config = {
    matcher : ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}