



"use client"

import React, { createContext, useState, useEffect } from "react"
import { useRouter, usePathname } from 'next/navigation'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const CartContext = createContext()


export const CartProvider = ({ children }) => {

	const [cart, setCart] = useState({})
	const [subTotal, setSubTotal] = useState(0)
	const [user, setUser] = useState({ value: null })
	const [progress, setProgress] = useState(0)


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
		console.log(newCart)

		toast.success('Item added Successfully!', { position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });
	}


	const removeFromCart = (itemCode, qty) => {

		let newCart = { ...cart }

		if (itemCode in cart) {
			newCart[itemCode].qty = cart[itemCode].qty - qty

			if (newCart[itemCode].qty <= 0) delete newCart[itemCode]
		}

		setCart(newCart)
		saveCart(newCart)

		toast.success('Item removed Successfully!', { position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });
	}


	const clearCart = () => {
		setCart({})
		saveCart({})
		toast.success('Cart cleared Successfully!', { position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });
	}


	const router = useRouter()
	const pathname = usePathname()

	const buyNow = (itemCode, qty, price, name, size, variant) => {
		saveCart({})

		let newCart = {}
		newCart[itemCode] = { qty, price, name, size, variant }

		setCart(newCart)
		saveCart(newCart)

		router.push('/checkout')
	}


	const logout = () => {
		localStorage.removeItem("hackthreads_token")
		setUser({ value: null })
		toast.success('Logged out Successfully.', { position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "light" });
		router.push("/")
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

			const token = localStorage.getItem("hackthreads_token")
			if (token) {
				setUser({ value: token })
			}
		}

		catch (error) {
			console.error(error)
			localStorage.clear()
		}
	}, [pathname])


	return (
		<CartContext.Provider value={{ cart, subTotal, addToCart, removeFromCart, clearCart, buyNow, user, logout, setProgress, progress, setCart, saveCart }}>
			{children}
		</CartContext.Provider>
	)
}
