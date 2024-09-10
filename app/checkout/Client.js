"use client"



import React, { useContext, useEffect, useState } from 'react'
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import { IoBagCheck } from "react-icons/io5"
import { CartContext } from "../context/CartContext"
import Script from 'next/script'
import { initiate } from '../actions/useractions'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Client() {

    const { cart, addToCart, removeFromCart, clearCart, subTotal, setCart, saveCart } = useContext(CartContext)


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    const [disabled, setDisabled] = useState(true)


    const handleChange = async (e) => {

        if (e.target.name == 'name') setName(e.target.value)
        if (e.target.name == 'email') setEmail(e.target.value)
        if (e.target.name == 'phone') setPhone(e.target.value)
        if (e.target.name == 'address') setAddress(e.target.value)

        if (e.target.name == 'pincode') {
            setPincode(e.target.value)

            let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
            let pinsJson = await pins.json()

            if (Object.keys(pinsJson).includes(e.target.value)) {
                setCity(pinsJson[e.target.value][0])
                setState(pinsJson[e.target.value][1])
            }

            else {
                setCity('')
                setState('')
            }
        }
    }
    
    
    useEffect(() => {
        if (name.length > 2 && email.length > 2 && phone.length > 2 && address.length > 2 && pincode.length > 2) setDisabled(false)
        else setDisabled(true)
    }, [name, email, phone, address, pincode])



    const pay = async (amount) => {

        //  check if the details are valid.....
        if(phone.length !== 10 || isNaN(phone)){
            toast.error('Incorect Phone Number!', { position: "top-center", autoClose: 3500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });
            return
        }

        if(pincode.length !== 6 || isNaN(pincode)){
            toast.error('Incorect PinCode!', { position: "top-center", autoClose: 3500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });
            return
        }


        //  Get the order Id
        let a = await initiate(email, cart, address, amount)

        if(!a){                 //  cart is tempered....
            toast.error('The price of some items in your cart is changed. Please try again.', { position: "top-center", autoClose: 3500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });
            setCart({})
		    saveCart({})
            return
        }

        let orderId = a.id

        var options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "HackThreads", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_HOST}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }



    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className='container mt-28 w-[85%] m-auto mb-20'>
                <h1 className='font-bold text-3xl text-center'>Checkout</h1>

                <h2 className='font-semibold text-xl mt-4'>1. Delivery Details</h2>

                <div className='mx-auto flex my-2'>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                            <input onChange={handleChange} placeholder="Enter your Name." value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input onChange={handleChange} placeholder="Enter your email." value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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

                <div className='mx-auto flex my-2'>
                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                            <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="city" className="leading-7 text-sm text-gray-600">District</label>
                            <input onChange={handleChange} value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>

                <h2 className='font-semibold text-xl my-4'>1. Review Cart Items and Pay</h2>

                <div className="cart bg-indigo-100 px-12 py-2 w-[75%] m-auto my-7">
                    <ol className='list-decimal font-normal'>
                        {Object.keys(cart).length === 0 && <div className='my-3'>The cart is Empty!</div>}
                        {Object.keys(cart).map((k) => (
                            <li key={k}>
                                <div className='item flex my-4 justify-between'>
                                    <div className='font-medium'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                                    <div className='font-medium flex items-center justify-center'>
                                        <FiMinusCircle className='text-lg cursor-pointer' onClick={() => removeFromCart(k, 1)} />
                                        <span className='mx-2 text-sm'>{cart[k].qty}</span>
                                        <FiPlusCircle className='text-lg cursor-pointer' onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <span className='total'>Subtotal: {subTotal}₹</span>
                </div>

                <button onClick={() => { pay(subTotal * 100) }} disabled={disabled || subTotal===0} className="disabled:bg-blue-400 flex mx-48 my-4 text-white bg-indigo-500 border-0 py-3 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"><IoBagCheck className='mr-1 text-lg' />Pay ₹{subTotal}</button>

            </div>
        </>
    )
}



