"use client"



import React from 'react'

export default function Client() {
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
                                        <th scope="col" className="px-6 py-4">#</th>
                                        <th scope="col" className="px-6 py-4">First</th>
                                        <th scope="col" className="px-6 py-4">Last</th>
                                        <th scope="col" className="px-6 py-4">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b transition duration-300 ease-in-out hover:bg-slate-100">
                                        <td className="whitespace-nowrap text-center px-6 py-4 font-medium">1</td>
                                        <td className="whitespace-nowrap text-center px-6 py-4">Mark</td>
                                        <td className="whitespace-nowrap text-center px-6 py-4">Otto</td>
                                        <td className="whitespace-nowrap text-center px-6 py-4">@mdo</td>
                                    </tr>
                                    <tr className="border-b transition duration-300 ease-in-out hover:bg-slate-100">
                                        <td className="whitespace-nowrap text-center px-6 py-4 font-medium">2</td>
                                        <td className="whitespace-nowrap text-center px-6 py-4">Jacob</td>
                                        <td className="whitespace-nowrap text-center px-6 py-4">Thornton</td>
                                        <td className="whitespace-nowrap text-center px-6 py-4">@fat</td>
                                    </tr>
                                    <tr className="border-b transition duration-300 ease-in-out hover:bg-slate-100">
                                        <td className="whitespace-nowrap text-center px-6 py-4 font-medium">3</td>
                                        <td className="whitespace-nowrap text-center px-6 py-4">Larry</td>
                                        <td className="whitespace-nowrap text-center px-6 py-4">Wild</td>
                                        <td className="whitespace-nowrap text-center px-6 py-4">@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}





