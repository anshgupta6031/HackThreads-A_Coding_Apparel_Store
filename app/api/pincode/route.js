//  http://localhost:3000/api/pincode



import { NextResponse } from "next/server";


export async function GET(request) {

    try {
        return NextResponse.json([224141, 224122, 223355, 885522, 123456])
    }

    catch (error) {
        console.error("Internal Server Error: ", error)
        return NextResponse.json({ error: "Internal Server Error" })
    }
}



