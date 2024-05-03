// 'use server'

import { NextRequest } from "next/server";

export default function getUserCredentials(
    req: NextRequest
){
    console.log("Hellooooo")
    console.log(req.headers);
    const requestHeaders = new Headers(req.headers);
        console.log({test: requestHeaders.get('Authorization')});
    return req.headers;
}