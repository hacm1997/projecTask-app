'use client'

import { authLogin } from '@/services/auth/auth.service'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { redirect } from 'next/navigation'

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handlerForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        authLogin(formData.email, formData.password).then((res) => {
            Cookies.set('auth.user', res.access_token, {
                expires: 0.5, // 12 horas
                path: '/',
                domain: 'localhost',
            });
            Cookies.set('auth_email', formData.email, {
                expires: 0.5, // 12 horas
                path: '/',
                domain: 'localhost',
            });
        }).catch((error) => {
            console.error(error)
        }).finally(() => {
            redirect('/dashboard')
        })
        setFormData({
            email: '',
            password: '',
        })
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-[95vh]">
                <h1 className='font-bold text-[32px] py-6'>ProjecTask Managment</h1>
                <div className="flex justify-center w-[80%] md:w-[70%] xl:w-[25%] rounded-[8px] transition-all duration-75 hover:shadow-cyan-glow bg-[#1A1E28] ">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-8">
                        <h2 className='text-center text-[24px] pb-2 font-semibold'>¡Bienvenido!</h2>
                        <input
                            className="h-[40px] bg-transparent border-[1px] border-[#9233E9] p-2 rounded-md"
                            type="text"
                            placeholder="Correo electrónico"
                            name="email"
                            value={formData.email}
                            onChange={handlerForm}
                            required
                        />
                        <input
                            className="h-[40px] bg-transparent border-[1px] border-[#9233E9] p-2 rounded-md"
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            value={formData.password}
                            onChange={handlerForm}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full font-semibold h-[40px] bg-[#9233E9] text-white rounded-md mt-2 transition-all duration-150 hover:bg-[#6b24ad]"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}
