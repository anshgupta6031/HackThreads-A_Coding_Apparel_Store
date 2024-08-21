




import React from 'react'
import Client from './Client'
import Product from "@/models/Product";
import connectToMongo from "@/middleware/mongoose";


export default async function Hoodies() {

    await connectToMongo()

    let data = await Product.find({ category: "hoodies" })

    let hoodies = {}

    for (let item of data) {

        if (item.title in hoodies) {
            if (!hoodies[item.title].color.includes(item.color) && item.availableQty > 0) {
                hoodies[item.title].color.push(item.color)
            }

            if (!hoodies[item.title].size.includes(item.size) && item.availableQty > 0) {
                hoodies[item.title].size.push(item.size)
            }
        }

        else {
            hoodies[item.title] = JSON.parse(JSON.stringify(item))

            if (item.availableQty > 0) {
                hoodies[item.title].color = [item.color]
                hoodies[item.title].size = [item.size]
            }
        }
    }

    let products = await JSON.parse(JSON.stringify(hoodies))

    return (
        <Client products={products} />
    )
}



