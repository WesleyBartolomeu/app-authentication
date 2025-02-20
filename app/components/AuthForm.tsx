'use client'
import React, {useState} from 'react'

export default function AuthForm() {
    const [isNewUser, setIsNewUser] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [isSigningup, setisSigningup] = useState(false)

    async function handleLogin(e) {
        e.preventDefault()
        //HandleLogin
    }

    async function handleSignUp(e) {
        e.preventDefault(setisSigningup(true))
        //HandleSignUp
    }

    let sighInMessage = isNewUser ? 'Login' : 'Se cadastre'
    const sighUpMessage = <p>Email senviado! Confira seu email para confirmar o cadastro</p>

    return ( 
        <form onSubmit={isNewUser ? handleSignUp : handleLogin}>
            <input 
            type="email" 
            value={email}
            placeholder='email'
            onChange={e => setEmail(e.target.value)}
            />
            <input 
            type="password"
            value={password} 
            placeholder='Senha'
            onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" >
                {sighInMessage}
            </button>
            <p>
                {isNewUser ?  (
                    <>
                    'Já tem uma conta?' {' '}
                    <button
                    type='button'
                    onClick={() => setIsNewUser(false)}
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
                    >
                        Se cadastre
                    </button>
                    </>
                )}
            </p>
                {isSigningIn && <p>Carregando...</p>}
                {isSigningup && <p>Carregando...</p>}

        </form>
    )
}