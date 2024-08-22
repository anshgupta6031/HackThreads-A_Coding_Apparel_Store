//  http://localhost:3000/api/signup



import { NextResponse } from "next/server";
import User from "@/models/User";
import connectToMongo from "@/middleware/mongoose";
import CryptoJS from "crypto-js";

connectToMongo()


export async function POST(request) {

    try {
        const data = await request.json()

        let user = await User.findOne({ email: data.email })
        if (user) {
            return NextResponse.json({ success: false, error: "Email already exists!" })
        }

        const {name, email} = data

        user = new User({name, email, password: CryptoJS.AES.encrypt(data.password, "secret123").toString()})
        await user.save()

        return NextResponse.json({ success: true, user: user })
    }

    catch (error) {
        console.error("Internal Server Error: ", error)
        return NextResponse.json({ error: "Internal Server Error" })
    }
}



