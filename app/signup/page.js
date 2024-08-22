"use client"



import Link from 'next/link'
import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Signup() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const onChange = (e) => {
        if (e.target.name === "name") setName(e.target.value)
        if (e.target.name === "email") setEmail(e.target.value)
        if (e.target.name === "password") setPassword(e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const formBody = { name, email, password }

        const response = await fetch("http://localhost:3000/api/signup", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(formBody)
        })

        let json = await response.json()

        if (json.success) toast.success('Account created Successfully.', { position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });
        else toast.error(json.error, { position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });

        setName("")
        setEmail("")
        setPassword("")
    }


    return (
        <section className="flex flex-col items-center pb-24 pt-36 bg-gray-100">
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl"> Create an account </h1>

                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" method="POST">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                            <input onChange={onChange} type="text" name="name" value={name} id="name" className="bg-gray-50 border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required="" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                            <input onChange={onChange} type="email" name="email" value={email} id="email" className="bg-gray-50 border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="abcd@gmail.com" required="" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                            <input onChange={onChange} type="password" name="password" id="password" value={password} placeholder="password" className="bg-gray-50 border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>

                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account? <Link className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="/login">Sign in here</Link></p>
                    </form>
                </div>
            </div>
        </section>
    )
}



