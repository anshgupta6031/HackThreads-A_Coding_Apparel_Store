"use server"



import Razorpay from "razorpay"
import Order from "@/models/Order"
import connectToMongo from "@/middleware/mongoose";


export const initiate = async (email, products, address, amount) => {

    await connectToMongo()

    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.KEY_SECRET })


    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    await Order.create({ email: email, orderId: x.id, products: products, address: address, amount: amount, status: "pending", paymentInfo: x })

    return x
}





