"use client"



import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Client() {

    const Router = useRouter();

    const [orders, setOrders] = useState([]);


    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token: localStorage.getItem("hackthreads_token") })
                })


                const json = await response.json();
                setOrders(json)
            }

            catch (error) {
                console.error("Error fetching orders: ", error);
            }
        }


        if (localStorage.getItem("hackthreads_token")) {
            fetchOrders()
        }

        else {
            Router.push("/login")
        }

    }, []);


    return (
        <div className='container mx-auto my-24 max-w-[75%]'>
            <h1 className='font-semibold text-3xl mx-16 p-6'>My Orders</h1>

            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Order Id</th>
                                        <th scope="col" className="px-6 py-4">Email</th>
                                        <th scope="col" className="px-6 py-4">Amount</th>
                                        <th scope="col" className="px-6 py-4">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((item) => {
                                        return <tr key={item._id} className="border-b transition duration-300 ease-in-out hover:bg-slate-100">
                                            <td className="whitespace-nowrap text-center px-6 py-4 font-medium">{item.orderId}</td>
                                            <td className="whitespace-nowrap text-center px-6 py-4">{item.email}</td>
                                            <td className="whitespace-nowrap text-center px-6 py-4">₹{item.amount / 100}.00</td>
                                            <td className="whitespace-nowrap text-center px-6 py-4"><Link href={`/order?id=${item.orderId}`}>Details</Link></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}





