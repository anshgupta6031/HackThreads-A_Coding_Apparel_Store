"use client"



import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Client() {

    const Router = useRouter()

    useEffect(() => {
        if (!localStorage.getItem("hackthreads_token")) {
            Router.push("/")
        }
    }, [])


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [npassword, setNpassword] = useState('')
    const [cnpassword, setCnpassword] = useState('')


    const handleChange = async (e) => {
        if (e.target.name == 'name') setName(e.target.value)
        if (e.target.name == 'phone') setPhone(e.target.value)
        if (e.target.name == 'address') setAddress(e.target.value)
        if (e.target.name == 'pincode') setPincode(e.target.value)
        if (e.target.name == 'password') setPassword(e.target.value)
        if (e.target.name == 'cpassword') setCpassword(e.target.value)
        if (e.target.name == 'npassword') setNpassword(e.target.value)
        if (e.target.name == 'cnpassword') setCnpassword(e.target.value)
    }


    useEffect(() => {
        fetchdata()
    }, [])


    const fetchdata = async () => {

        const token = localStorage.getItem("hackthreads_token")

        const formBody = { token: token }

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(formBody)
        })

        let json = await response.json()

        setEmail(json.email)
        setName(json.name)
        setAddress(json.address)
        setPhone(json.phone)
        setPincode(json.pincode)
    }


    const handleUserSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("hackthreads_token")

        const formBody = { token: token, address: address, pincode: pincode, phone: phone, name: name }

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(formBody)
        })

        let json = await response.json()

        toast.success('Account Updated Successfully.', { position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });
    }


    const handlePasswordSubmit = async (e) => {
        e.preventDefault()

        if (password !== cpassword || password === "") {
            toast.error('Invalid Current Passwords', { position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });
            return
        }

        if (npassword !== cnpassword || npassword === "") {
            toast.error('Invalid New Passwords', { position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });
            return
        }

        const token = localStorage.getItem("hackthreads_token")

        const formBody = { token: token, password: password, npassword: npassword }

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(formBody)
        })

        let json = await response.json()

        if(json.success){
            toast.success('Password Updated Successfully.', { position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });
            setPassword("")
            setCpassword("")
            setNpassword("")
            setCnpassword("")
        }

        else toast.error('Wrong Password.', { position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });
    }


    return (
        <>
            <div className='container mt-28 w-[85%] m-auto mb-20'>
                <h1 className='font-bold text-3xl text-center'>Update Your Account</h1>

                <h2 className='font-semibold text-xl mt-8'>1. Delivery Details</h2>

                <div className='mx-auto flex my-3'>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                            <input onChange={handleChange} placeholder="Enter your Name." value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input readOnly value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>

                <div className="px-2 w-full">
                    <div className="mb-4">
                        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                        <textarea onChange={handleChange} placeholder="Enter your address." value={address} cols="30" rows="2" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                    </div>
                </div>

                <div className='mx-auto flex my-2'>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                            <input onChange={handleChange} placeholder="Enter your 10 digit phone number." value={phone} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
                            <input onChange={handleChange} placeholder="Enter your 6 digit pincode." value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>

                <button onClick={handleUserSubmit} className="disabled:bg-blue-400 flex mx-4 my-3 text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm">Save</button>



                <h2 className='font-semibold text-xl mt-10'>2. Change Password</h2>

                <div className='mx-auto flex my-3'>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Current Password</label>
                            <input onChange={handleChange} placeholder="Enter old Password." value={password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm Password</label>
                            <input onChange={handleChange} placeholder="Confirm old Password." value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>

                <div className='mx-auto flex my-3'>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
                            <input onChange={handleChange} placeholder="Enter New Password." value={npassword} type="password" id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="cnpassword" className="leading-7 text-sm text-gray-600">Confirm New Password</label>
                            <input onChange={handleChange} placeholder="Confirm new Password." value={cnpassword} type="password" id="cnpassword" name="cnpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>

                <button onClick={handlePasswordSubmit} className="disabled:bg-blue-400 flex mx-4 mt-3 mb-32 text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm">Update</button>
            </div>
        </>
    )
}




