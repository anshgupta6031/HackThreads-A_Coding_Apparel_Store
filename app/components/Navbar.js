



"use client"

import React, { useContext, useRef } from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart } from "react-icons/ai"
import { IoCloseCircleOutline } from "react-icons/io5"
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi"
import { IoBagCheck } from "react-icons/io5"
import { CartContext } from "../context/CartContext"



export default function Navbar() {

    const { cart, addToCart, removeFromCart, clearCart, subTotal } = useContext(CartContext)

    const ref = useRef()

    const toggleCart = () => {
        if (ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-full")
            ref.current.classList.add("translate-x-0")
        }
        
        else {
            ref.current.classList.remove("translate-x-0")
            ref.current.classList.add("translate-x-full")
        }
    }

    
    return (
        <div>
            <header className="fixed top-0 left-0 right-0 z-20 bg-white text-gray-600 body-font shadow-md">
                <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center shadow-md">
                    <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">Tailblocks</span>
                    </Link>
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        <Link href="/tshirts" className="mr-5 hover:text-gray-900">Tshirts</Link>
                        <Link href="/hoodies" className="mr-5 hover:text-gray-900">Hoodies</Link>
                        <Link href="/stickers" className="mr-5 hover:text-gray-900">Stickers</Link>
                        <Link href="/mugs" className="mr-5 hover:text-gray-900">Mugs</Link>
                    </nav>
                    <button onClick={toggleCart} className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">Cart
                        <AiOutlineShoppingCart className='ml-2' />
                    </button>

                    <div ref={ref} className="sideCart fixed top-0 right-0 w-80 h-full bg-indigo-100 px-8 py-10 transform transition-transform translate-x-full z-20 opacity-[0.99]">
                        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>

                        <span onClick={toggleCart} className="absolute top-3 right-3 cursor-pointer text-2xl"><IoCloseCircleOutline /></span>

                        <ol className='list-decimal font-normal'>
                            {Object.keys(cart).length === 0 && <div className='my-3'>The cart is Empty!</div>}
                            {Object.keys(cart).map((k) => (
                                <li key={k}>
                                    <div className='item flex my-4'>
                                        <div className='w-2/3 font-medium'>{cart[k].name}</div>
                                        <div className='w-1/3 font-medium flex items-center justify-center'>
                                            <FiMinusCircle className='text-lg cursor-pointer' onClick={() => removeFromCart(k, 1)} />
                                            <span className='mx-2 text-sm'>{cart[k].qty}</span>
                                            <FiPlusCircle className='text-lg cursor-pointer' onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <div className='total font-medium mt-8 mx-6'>Subtotal: {subTotal}₹</div>

                        <div className="flex mt-8 justify-center">
                            <Link href='/checkout'><button onClick={toggleCart} className="flex mx-2 text-white bg-indigo-500 border-0 py-3 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"><IoBagCheck className='mr-1 text-lg' />Checkout</button></Link>
                            <button onClick={clearCart} className="flex mx-2 text-white bg-indigo-500 border-0 py-3 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm">Clear Cart</button>
                        </div>
                    </div>
                </div>
            </header>
            <hr />
        </div>
    )
}
