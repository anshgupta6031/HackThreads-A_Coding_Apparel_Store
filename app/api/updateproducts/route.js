//  http://localhost:3000/api/updateproducts



import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectToMongo from "@/middleware/mongoose";

connectToMongo()


export async function POST(request) {

    try {
        const data = await request.json()

        for (let i = 0; i < data.length; i++) {
            await Product.findByIdAndUpdate(data[i]._id, data[i])
        }

        return NextResponse.json({ success: "Products Updated successfully." })
    }

    catch (error) {
        console.error("Internal Server Error: ", error)
        return NextResponse.json({ error: "Internal Server Error" })
    }
}



