//  http://localhost:3000/api/getproducts



import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectToMongo from "@/middleware/mongoose";

connectToMongo()


export async function GET(request) {

    try {
        let products = await Product.find()

        let tshirts = {}

        for (let item of products) {

            if (item.title in tshirts) {
                if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
                    tshirts[item.title].color.push(item.color)
                }

                if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
                    tshirts[item.title].size.push(item.size)
                }
            }

            else {
                tshirts[item.title] = JSON.parse(JSON.stringify(item))

                if (item.availableQty > 0) {
                    tshirts[item.title].color = [item.color]
                    tshirts[item.title].size = [item.size]
                }
            }
        }

        return NextResponse.json({ tshirts })
    }

    catch (error) {
        console.error("Internal Server Error: ", error)
        return NextResponse.json({ error: "Internal Server Error" })
    }
}



