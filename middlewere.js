import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function miffleware(req) {
    const res = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name){
                    return req.cookies.get(name)?.value
                },
                set(name, value, options){
                    req.cookies.set({
                        name, value, ...options
                    })
                    const response = NextResponse.next({
                        request: {
                            headers: {
                                headers: req.headers
                            }
                        }
                    })
                    response.cookies.set({
                        name, value, ...options
                    })
                },
                remove(name, options){
                    res.cookies.set({
                        name, value: '', ...options
                    })
                    const response = NextResponse.next({
                        request: {
                            headers: {
                                headers: req.headers
                            }
                        }
                    })
                    response.cookies.set({
                        name, value: '', ...options
                    })
                }
            }
        }
    )

    const {data: {user}} = await supabase.auth.getUser();

    console.log({user})

    if  (user && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if  (!user && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/', req.url))
    }
    return res
}

export const config = {
    matcher: ['/' , '/dashboard']
}
