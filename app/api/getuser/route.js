//  http://localhost:3000/api/getuser



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

        let dbuser = await User.findOne({ email: user.email })

        const { name, email, address, pincode, phone } = dbuser

        return NextResponse.json({ name, email, address, pincode, phone })
    }

    catch (error) {
        console.error("Internal Server Error: ", error)
        return NextResponse.json({ error: "Internal Server Error" })
    }
}



