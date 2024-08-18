//  http://localhost:3000/api/getproducts



import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectToMongo from "@/middleware/mongoose";

connectToMongo()


export async function GET(request) {

    try {
        let products = await Product.find()
        return NextResponse.json({ products })
    }

    catch (error) {
        console.error("Internal Server Error: ", error)
        return NextResponse.json({ error: "Internal Server Error" })
    }
}



