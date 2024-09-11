



import React from 'react'
import Client from './Client'
import ProductModel from "@/models/Product";
import connectToMongo from "@/middleware/mongoose";


export default async function Product({ params }) {

    await connectToMongo()

    let product = await ProductModel.findOne({ slug: params.slug, availableQty: { $gt: 0 } })
    if(!product) return <Client error={404} />                //  if the product is not available or does not exist.....
    let variants = await ProductModel.find({ title: product.title, category: product.category, availableQty: { $gt: 0 } })

    let colorSizeSlug = {}              //  {red: {XL: {slug: "wear-the-code"}}}

    for (let item of variants) {
        if (Object.keys(colorSizeSlug).includes(item.color)) {
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        }

        else {
            colorSizeSlug[item.color] = {}
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        }
    }

    let data = await JSON.parse(JSON.stringify(colorSizeSlug))
    let prod = await JSON.parse(JSON.stringify(product))


    return (
        <Client params={params} product={prod} variants={data} />
    )
}


