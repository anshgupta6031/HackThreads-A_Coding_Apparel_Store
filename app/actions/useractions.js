"use server"



import Razorpay from "razorpay"
import Order from "@/models/Order"
import ProductModel from '@/models/Product'
import connectToMongo from "@/middleware/mongoose";


export const initiate = async (email, products, address, amount) => {

    await connectToMongo()
    

    //  Check if the cart is tempered.....

    let totalAmount = 0
    for (let item in products) {
        let product = await ProductModel.findOne({ slug: item })

        totalAmount += (products[item].price * products[item].qty)

        if((product.price != products[item].price)){
            return;
        }
    }

    if((totalAmount != amount/100)){
        return;
    }


    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.KEY_SECRET })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    await Order.create({ email: email, orderId: x.id, products: products, address: address, amount: amount, status: "pending", paymentInfo: x })

    return x
}





