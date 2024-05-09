import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest){
    let authorization = request.cookies.get('Authorization')
    if(authorization?.value){
        return NextResponse.next();
    }else{
        return NextResponse.redirect(new URL('/signin', request.url));
    }
}

export const config = {
    matcher: '/movie/:path*',
}