"use client"



import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Myaccount() {

    const Router = useRouter()

    useEffect(() => {
        if (!localStorage.getItem("hackthreads_token")) {
            Router.push("/")
        }
    }, [])


    return (
        <div className='my-36'>
            This is my account
        </div>
    )
}











