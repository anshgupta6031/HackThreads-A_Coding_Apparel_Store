




import React from 'react'
import Client from './Client'
import Product from "@/models/Product";
import connectToMongo from "@/middleware/mongoose";


export default async function Sweatshirts() {

    await connectToMongo()

    let data = await Product.find({ category: "sweatshirts" })

    let sweatshirts = {}

    for (let item of data) {

        if (item.title in sweatshirts) {
            if (!sweatshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
                sweatshirts[item.title].color.push(item.color)
            }

            if (!sweatshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
                sweatshirts[item.title].size.push(item.size)
            }
        }

        else {
            sweatshirts[item.title] = JSON.parse(JSON.stringify(item))

            if (item.availableQty > 0) {
                sweatshirts[item.title].color = [item.color]
                sweatshirts[item.title].size = [item.size]
            }
        }
    }

    let products = await JSON.parse(JSON.stringify(sweatshirts))

    return (
        <Client products={products} />
    )
}



