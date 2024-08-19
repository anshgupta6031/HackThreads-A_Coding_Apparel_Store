"use client"



import React from 'react'
import Link from 'next/link'


export default function Client(props) {
    return (
        <div>
            <section className="text-gray-600 body-font mt-32">
                <div className="container px-5 mx-auto">
                    <div className="flex flex-wrap mx-9 my-16 gap-5">
                        {props.products.products.map((product) => {
                            return product.category==="T-shirt" && <Link key={product._id} href={`/product/${product.slug}`}><div className="p-4 w-full shadow-lg">
                                <div className="block relative rounded overflow-hidden">
                                    <img alt="ecommerce" className="h-[45vh] w-[19.7vw] m-auto block" src={product.img} />
                                </div>
                                <div className="mt-4 text-center">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-shirt</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
                                    <p className="mt-1">₹{product.price}</p>
                                </div>
                            </div></Link>
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}
