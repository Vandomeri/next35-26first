'use client'

import { useEffect, useState } from "react"

export default function ProductsPage() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getProducts() {
            const resp = await fetch('/api/products')
            const data = await resp.json()
            setProducts(data)
        }
        getProducts()
    }, [])

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')

    async function createProduct(e) {
        e.preventDefault()

        const resp = await fetch('/api/products', {
            method: 'post',
            body: JSON.stringify({
                title: title,
                price: price
            })
        })
        const data = await resp.json()
        if (data.status === 'success') {
            setTitle('')


            setProducts(
                [
                    ...products,
                    {
                        title: data.message.title,
                        price: data.message.price,
                        id: data.message.id,
                    }
                ]

            )
        }
        console.log(data)
    }

    return (
        <div>
            <h1>Products List</h1>
            {
                products.map(product => (
                    <div key={product.id}>
                        <p>{product.title}</p>
                        <p>${product.price}</p>
                    </div>
                ))
            }

            <div>
                <h2>Создать товар</h2>
                <form onSubmit={(e) => createProduct(e)}>
                    <input value={title} onInput={(e) => setTitle(e.target.value)} type="text" placeholder="Введите название товара" />

                    <input value={price} onInput={(e) => setPrice(e.target.value)} type="text" placeholder="Введите цену товара" />
                    <button>Создать</button>
                </form>
            </div>

        </div>
    )
}
