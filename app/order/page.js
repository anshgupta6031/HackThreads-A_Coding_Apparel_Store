



import React from 'react'
import Client from './Client'
import connectToMongo from "@/middleware/mongoose";
import OrderModel from '@/models/Order';


export default async function Order({ searchParams }) {
    console.log(searchParams)
    await connectToMongo()

    let order = await OrderModel.findOne({ orderId: searchParams.id })

    order = await JSON.parse(JSON.stringify(order))

    let clearcart = false
    if (searchParams.clearcart) clearcart = true

    return (
        <Client order={order} clearcart={clearcart} />
    )
}
