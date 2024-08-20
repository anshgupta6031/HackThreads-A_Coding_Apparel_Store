"use client"



import React, { useContext } from 'react'
import Link from 'next/link'
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import { IoBagCheck } from "react-icons/io5"
import { CartContext } from "../context/CartContext"


export default function Checkout() {

    const { cart, addToCart, removeFromCart, clearCart, subTotal } = useContext(CartContext)

    return (
        <div className='container mt-28 w-[85%] m-auto mb-20'>
            <h1 className='font-bold text-3xl text-center'>Checkout</h1>

            <h2 className='font-semibold text-xl mt-4'>1. Delivery Details</h2>

            <div className='mx-auto flex my-2'>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <div className="px-2 w-full">
                <div className="mb-4">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea cols="30" rows="2" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                </div>
            </div>

            <div className='mx-auto flex my-2'>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                        <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <div className='mx-auto flex my-2'>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                        <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
                        <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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

            <Link href='/checkout'><button className="flex mx-48 my-4 text-white bg-indigo-500 border-0 py-3 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"><IoBagCheck className='mr-1 text-lg' />Pay ₹{subTotal}</button></Link>

        </div>
    )
}



