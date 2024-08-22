//  http://localhost:3000/api/signup



import { NextResponse } from "next/server";
import User from "@/models/User";
import connectToMongo from "@/middleware/mongoose";

connectToMongo()


export async function POST(request) {

    try {
        const data = await request.json()

        let user = await User.findOne({ email: data.email })
        if (user) {
            return NextResponse.json({ success: false, error: "Email already exists!" })
        }

        user = new User(data)
        await user.save()

        return NextResponse.json({ success: true, user: user })
    }

    catch (error) {
        console.error("Internal Server Error: ", error)
        return NextResponse.json({ error: "Internal Server Error" })
    }
}



