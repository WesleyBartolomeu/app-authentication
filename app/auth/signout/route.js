import { createServerClient } from "@supabase/ssr";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function POST(req) {
    const cookieStore = cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value;
                },
                set(name, value, options) {
                    cookieStore.set({ name, value, ...options });
                },
                remove(name, options) {
                    cookieStore.set({ name, value: '', ...options });
                }
            }
        }
    );

    // Verifica se há uma sessão ativa
    const { data: { session } } = await supabase.auth.getSession();
    console.log({ session });

    if (session) {
        await supabase.auth.signOut(); // Faz o logout
    }

    // Redireciona para a página inicial após o logout
    return NextResponse.redirect(new URL('/', req.nextUrl.origin), {
        status: 302
    });
}