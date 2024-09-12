//  http://localhost:3000/api/updatepassword



import { NextResponse } from "next/server";
import User from "@/models/User";
import connectToMongo from "@/middleware/mongoose";
var jwt = require('jsonwebtoken');
import CryptoJS from "crypto-js";

connectToMongo()


export async function POST(request) {

    try {
        const data = await request.json()

        let token = data.token

        let user = jwt.verify(token, process.env.JWT_SECRET)

        let dbuser = await User.findOne({ email: user.email })

        if (data.password === CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8)) {
            dbuser = await User.findOneAndUpdate({ email: user.email }, { password: CryptoJS.AES.encrypt(data.npassword, process.env.AES_SECRET).toString() })
            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ success: false })
    }

    catch (error) {
        console.error("Internal Server Error: ", error)
        return NextResponse.json({ error: "Internal Server Error" })
    }
}



