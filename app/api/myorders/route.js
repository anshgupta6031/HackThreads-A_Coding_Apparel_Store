



import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connectToMongo from "@/middleware/mongoose";
var jwt = require('jsonwebtoken');

connectToMongo();


export async function POST(request) {

    try {
        const { token } = await request.json()

        const data = jwt.verify(token, process.env.JWT_SECRET)

        let orders = await Order.find({ email: data.email, status: "Success" })

        orders = JSON.parse(JSON.stringify(orders));

        return NextResponse.json(orders)
    }
    
    catch (error) {
        console.error("Internal Server Error: ", error);
        return NextResponse.json({ error: "Internal Server Error" })
    }
}



