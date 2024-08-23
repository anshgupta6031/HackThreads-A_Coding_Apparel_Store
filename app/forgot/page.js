"use client"



import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


export default function Forgot() {

    const Router = useRouter()

    useEffect(() => {
        if (localStorage.getItem("hackthreads_token")) {
            Router.push("/")
        }
    }, [])


    return (

        <div className="min-h-screen rounded-3xl bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                <h1 className="text-center text-2xl font-bold">Forgot Password</h1>
                <p className="mb-6 text-center text-sm text-gray-600 max-w"> Or <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500"> Login </Link></p>

                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email"> Email Address </label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email address" />
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit"> Reset Password </button>
                </form>
            </div>
        </div>

    )
}
