



import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils"
import Order from "@/models/Order"
import Product from "@/models/Product";
import connectToMongo from "@/middleware/mongoose";


export const POST = async (request) => {

    await connectToMongo()

    let body = await request.formData()
    body = Object.fromEntries(body)

    //  Check if razorpay OrderId is present in the database....

    let p = await Order.findOne({ orderId: body.razorpay_order_id })

    if (!p) {
        return NextResponse.json({ success: false, message: "Order Id not found!" })
    }

    //  verify the payment.......

    let xx = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, process.env.KEY_SECRET)

    if (xx) {
        //  Update payment Status.....
        let order = await Order.findOneAndUpdate({ orderId: body.razorpay_order_id }, { status: "Success" }, { new: true })

        //  update the available qty after purchase...
        let products = order.products
        for(let slug in products){
            await Product.findOneAndUpdate({slug: slug}, {$inc: {availableQty: -products[slug].qty}})
        }

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/order?id=${body.razorpay_order_id}&clearcart=true`)
    }

    else {
        return NextResponse.json({ success: false, message: "Payment Verification Failed!" })
    }

}






