import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest){
    let cookie = request.cookies.get('Authorization')
    if(cookie?.value){
        return NextResponse.next();
    }else{
        return NextResponse.redirect(new URL('/signin', request.url));
    }
}

export const config = {
    matcher: '/movie',
}