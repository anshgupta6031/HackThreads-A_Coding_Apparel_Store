



import React from 'react'
import Client from './Client'
import Order from '@/models/Order';
import connectToMongo from "@/middleware/mongoose";


export default async function Orders() {

    await connectToMongo()

    let orders = await Order.find()


    return (
        <Client orders={orders} />
    )
}


