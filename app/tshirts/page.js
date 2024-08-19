




import React from 'react'
import Client from './Client'


export default async function Tshirts() {

    let data = await fetch(`http://localhost:3000/api/getproducts`)
    let products = await data.json()

    return (
        <Client products={products} />
    )
}



