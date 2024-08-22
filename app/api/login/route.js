//  http://localhost:3000/api/login



import { NextResponse } from "next/server";
import User from "@/models/User";
import connectToMongo from "@/middleware/mongoose";

connectToMongo()


export async function POST(request) {

    try {
        const data = await request.json()

        let user = await User.findOne({ email: data.email })

        if (user) {
            if (data.email === user.email && data.password === user.password) {
                return NextResponse.json({ success: true, email: user.email, name: user.name })
            }

            return NextResponse.json({ success: false, error: "Invalid Credentials..." })
        }

        else {
            return NextResponse.json({ success: false, error: "User not found." })
        }
    }

    catch (error) {
        console.error("Internal Server Error: ", error)
        return NextResponse.json({ success: false, error: "Internal Server Error" })
    }
}



