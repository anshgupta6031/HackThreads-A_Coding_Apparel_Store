//  http://localhost:3000/api/pincode



import { NextResponse } from "next/server";
import pincodes from '../../../pincodes.json'


export async function GET(request) {

    try {
        return NextResponse.json(pincodes)
    }

    catch (error) {
        console.error("Internal Server Error: ", error)
        return NextResponse.json({ error: "Internal Server Error" })
    }
}



