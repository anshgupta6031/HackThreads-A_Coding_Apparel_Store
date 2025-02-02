"use client"



import React, { useContext, useEffect } from 'react'
import { CartContext } from '../context/CartContext'


export default function Client({ order, clearcart }) {

    let products = order.products

    const { setCart, saveCart } = useContext(CartContext)

    useEffect(() => {
        if (clearcart) {
            setCart({})
            saveCart({})
        }
    }, [])


    return (
        <section className="text-gray-600 body-font overflow-hidden mt-7">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">HACKTHREADS</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 mt-2">Order Id: {order.orderId}</h1>
                        <p className="leading-relaxed">Congratulations!!! Your order has been Successfully placed...</p>
                        <p className="leading-relaxed">Your payment status is : {order.status}.</p>
                        <p className="leading-relaxed mb-5">Order Placed on : {(new Date(order.createdAt)).toLocaleDateString("en-IN", {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'})}.</p>

                        <div className="flex mb-1 font-semibold justify-evenly">
                            <a className="flex-grow border-gray-300 py-2 text-lg px-1">Item Description</a>
                            <a className="flex-grow border-gray-300 py-2 text-lg px-1 text-center">Quantity</a>
                            <a className="flex-grow border-gray-300 py-2 text-lg px-1 text-end">Item Total</a>
                        </div>

                        {Object.keys(products).map((key) => {
                            return <div key={key} className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500">{products[key].name} ({products[key].size}/{products[key].variant})</span>
                                <span className="m-auto text-gray-900">{products[key].qty}</span>
                                <span className="ml-auto text-gray-900">₹{products[key].price * products[key].qty}</span>
                            </div>
                        })}

                        <div className="flex mt-5">
                            <span className="title-font font-medium text-2xl text-gray-900">Subtotal: ₹{order.amount / 100}.00</span>
                            <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>
                        </div>
                    </div>
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                </div>
            </div>
        </section>
    )
}



