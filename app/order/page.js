



import React from 'react'
import Client from './Client'
import connectToMongo from "@/middleware/mongoose";
import OrderModel from '@/models/Order';


export default async function Order({ searchParams }) {

    await connectToMongo()

    let order = await OrderModel.findOne({ orderId: searchParams.id })
    
    order = await JSON.parse(JSON.stringify(order))
    

    return (
        <Client order={order} />
    )
}
