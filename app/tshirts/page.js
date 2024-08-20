




import React from 'react'
import Client from './Client'
import Product from "@/models/Product";
import connectToMongo from "@/middleware/mongoose";


export default async function Tshirts() {

    await connectToMongo()

    let data = await Product.find({ category: "T-shirt" })

    let tshirts = {}

    for (let item of data) {

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

    let products = await JSON.parse(JSON.stringify(tshirts))

    return (
        <Client products={products} />
    )
}



