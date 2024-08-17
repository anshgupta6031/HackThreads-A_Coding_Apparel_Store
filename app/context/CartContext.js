



"use client"

import React, { createContext, useState, useEffect } from "react"

export const CartContext = createContext()


export const CartProvider = ({ children }) => {

	const [cart, setCart] = useState({})
	const [subTotal, setSubTotal] = useState(0)


	const saveCart = (newCart) => {

		localStorage.setItem("cart", JSON.stringify(newCart))

		let subt = 0
		let keys = Object.keys(newCart)

		for (let i = 0; i < keys.length; i++) {
			subt += (newCart[keys[i]].price * newCart[keys[i]].qty)
		}

		setSubTotal(subt)
	}


	const addToCart = (itemCode, qty, price, name, size, variant) => {

		let newCart = { ...cart }

		if (itemCode in cart) {
			newCart[itemCode].qty = cart[itemCode].qty + qty
		}

		else {
			newCart[itemCode] = { qty, price, name, size, variant }
		}

		setCart(newCart)
		saveCart(newCart)
	}


	const removeFromCart = (itemCode, qty) => {

		let newCart = { ...cart }

		if (itemCode in cart) {
			newCart[itemCode].qty = cart[itemCode].qty - qty

			if (newCart[itemCode].qty <= 0) delete newCart[itemCode]
		}

		setCart(newCart)
		saveCart(newCart)
	}


	const clearCart = () => {
		setCart({})
		saveCart({})
	}


	useEffect(() => {

		try {
			if (localStorage.getItem("cart")) {
				let storedCart = JSON.parse(localStorage.getItem("cart"))
				setCart(storedCart)

				let subt = 0
				let keys = Object.keys(storedCart)

				for (let i = 0; i < keys.length; i++) {
					subt += storedCart[keys[i]].price * storedCart[keys[i]].qty
				}

				setSubTotal(subt)
			}
		}

		catch (error) {
			console.error(error)
			localStorage.clear()
		}
	}, [])


	return (
		<CartContext.Provider value={{ cart, subTotal, addToCart, removeFromCart, clearCart }}>
			{children}
		</CartContext.Provider>
	)
}
