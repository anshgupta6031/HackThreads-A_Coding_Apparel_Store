//  http://localhost:3000/api/addproducts



import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectToMongo from "@/middleware/mongoose";

connectToMongo()


export async function POST(request) {

    try {
        const data = await request.json()

        for (let i = 0; i < data.length; i++) {
            let p = new Product({
                title: data[i].title,
                slug: data[i].slug,
                description: data[i].description,
                img: data[i].img,
                category: data[i].category,
                size: data[i].size,
                color: data[i].color,
                price: data[i].price,
                availableQty: data[i].availableQty,
            })

            await p.save()
        }

        return NextResponse.json({ success: "Products added successfully." })
    }

    catch (error) {
        console.error("Internal Server Error: ", error)
        return NextResponse.json({ error: "Internal Server Error" })
    }
}



