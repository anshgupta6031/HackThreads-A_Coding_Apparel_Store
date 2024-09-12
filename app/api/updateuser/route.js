//  http://localhost:3000/api/updateuser



import { NextResponse } from "next/server";
import User from "@/models/User";
import connectToMongo from "@/middleware/mongoose";
var jwt = require('jsonwebtoken');

connectToMongo()


export async function POST(request) {

    try {
        const data = await request.json()

        let token = data.token

        let user = jwt.verify(token, process.env.JWT_SECRET)

        let dbuser = await User.findOneAndUpdate({ email: user.email }, { address: data.address, pincode: data.pincode, phone: data.phone, name: data.name })

        return NextResponse.json({ success: true })
    }

    catch (error) {
        console.error("Internal Server Error: ", error)
        return NextResponse.json({ error: "Internal Server Error" })
    }
}



