//  http://localhost:3000/api/pincode



import { NextResponse } from "next/server";


export async function GET(request) {

    try {

        let pincodes = {
            "224141": ["Goshainganj", "Uttar Pradesh"],
            "110003": ["Delhi", "Delhi"],
            "000000": ["Burtalla", "Tripura"],
        }


        return NextResponse.json(pincodes)
    }

    catch (error) {
        console.error("Internal Server Error: ", error)
        return NextResponse.json({ error: "Internal Server Error" })
    }
}



