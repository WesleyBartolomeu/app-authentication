'use client'

import React, {useState} from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
    const [isNewUser, setIsNewUser] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [isSigningUp, setisSigningUp] = useState(false)
    const router = useRouter()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setIsSigningIn(true);
        const {data, error} = await supabase.auth.signInWithPassword({ 
            email,
            password
        })
        console.log({error, data})
        if (!error) {
        router.push('/photos')
        } else {
            setisSigningUp(false)
            console.log('Erro ao logar')
        }
    }

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault();
        const {data, error} = await supabase.auth.signUp({
            email,
            password
        })
        if (!error) {
            setisSigningUp(true);
            console.log('email enviado')
        }
        console.log(data, error);
    }

    let signInMessage = 'Login'

    if (isSigningIn) {
        signInMessage = 'Logar'
        console.log('mudado para login')
    }  else if (isNewUser) {
        signInMessage = 'Cadastrar'
        console.log('mudado para cadastro')
    }   

    const signUpMessage = <p className='text-cemter text-white'>Email senviado! Confira seu email para confirmar o cadastro</p>

    return ( 
        <form onSubmit={isNewUser ? handleSignUp : handleLogin} className='flex flex-col space-y-4'>
            <input 
            type="email" 
            value={email}
            placeholder='email'
            onChange={e => setEmail(e.target.value)}
            className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            />
            <input 
            type="password"
            value={password} 
            placeholder='Senha'
            onChange={e => setPassword(e.target.value)}
            className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            />
            <button type="submit" 
            className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
                {signInMessage}
            </button>
            <p>
                {isNewUser ?  (
                    <>
                    'Já tem uma conta?' {' '}
                    <button
                    type='button'
                    onClick={() => setIsNewUser(false)}
                    className='text-indigo-400 hover:text-indigo-600'
                    >
                        Faça login
                    </button>
                    </>
                )
                    
                : (
                    <>
                    'Não tem uma conta?' {' '}
                    <button
                    type='button'
                    onClick={() => setIsNewUser(true)}
                    className='text-indigo-400 hover:text-indigo-600'
                    >
                        Se cadastre
                    </button>
                    </>
                )}
            </p>
                {isSigningIn && <p>Carregando...</p>}
                {isSigningUp && signUpMessage}
        </form>
    )
}