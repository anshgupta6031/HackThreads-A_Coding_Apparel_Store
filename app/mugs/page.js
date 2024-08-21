




import React from 'react'
import Client from './Client'
import Product from "@/models/Product";
import connectToMongo from "@/middleware/mongoose";


export default async function Mugs() {

    await connectToMongo()

    let data = await Product.find({ category: "mugs" })

    let mugs = {}

    for (let item of data) {

        if (item.title in mugs) {
            if (!mugs[item.title].color.includes(item.color) && item.availableQty > 0) {
                mugs[item.title].color.push(item.color)
            }

            if (!mugs[item.title].size.includes(item.size) && item.availableQty > 0) {
                mugs[item.title].size.push(item.size)
            }
        }

        else {
            mugs[item.title] = JSON.parse(JSON.stringify(item))

            if (item.availableQty > 0) {
                mugs[item.title].color = [item.color]
                mugs[item.title].size = [item.size]
            }
        }
    }

    let products = await JSON.parse(JSON.stringify(mugs))

    return (
        <Client products={products} />
    )
}



