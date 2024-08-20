"use client"



import React from 'react'
import Link from 'next/link'


export default function Client(props) {
    return (
        <div>
            <section className="text-gray-600 body-font mt-32">
                <div className="container px-5 mx-auto">
                    <div className="flex flex-wrap mx-9 my-16 gap-5">
                        {Object.keys(props.products).map((product) => {
                            return <Link key={props.products[product]._id} href={`/product/${props.products[product].slug}`}><div className="p-4 w-full shadow-lg">
                                <div className="block relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="h-[45vh] w-[19.7vw] m-auto block" src={props.products[product].img} />
                                </div>
                                <div className="mt-4 text-center">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-shirt</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{props.products[product].title}</h2>
                                    <p className="mt-1">₹{props.products[product].price}</p>

                                    <div className="mt-1">
                                        {props.products[product].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                                        {props.products[product].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L</span>}
                                        {props.products[product].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
                                        {props.products[product].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
                                        {props.products[product].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>}
                                    </div>

                                    <div className="mt-1">
                                        {props.products[product].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {props.products[product].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {props.products[product].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {props.products[product].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {props.products[product].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                    </div>
                                </div>
                            </div></Link>
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}
