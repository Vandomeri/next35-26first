'use client'

import { Button } from 'antd'
import React, { useState } from 'react'

export default function ProductAdminCard({ product, setProducts }) {



    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [isEditing, setIsEditing] = useState(false)

    async function deleteProduct(id) {
        const resp = await fetch('/api/products', {
            method: 'delete',
            body: JSON.stringify({
                id: id
            })
        })

        const result = await resp.json()

        if (resp.ok) {
            // setProducts(products.filter(product => product.id !== result.id))
            setProducts(prev => prev.filter(product => product.id !== result.id))
        }

    }

    async function editProduct() {
        const resp = await fetch('/api/products', {
            method: 'put',
            body: JSON.stringify({
                price: price,
                title: title,
                id: product.id
            })
        })

        if (resp.ok) {
            setIsEditing(false)
        }
    }

    return (
        <div className="bg-gray-500 text-white rounded-lg p-4">
            {
                isEditing ?
                    <input type="text" value={title} onInput={(e) => setTitle(e.target.value)} />
                    :
                    <p className="text-2xl text-center font-bold">{title}</p>
            }
            {
                isEditing ?
                    <input type="text" value={price} onInput={(e) => setPrice(e.target.value)} />
                    :
                    <p className="text-center">${price}</p>
            }


            <div>


                <button
                    className="px-2 py-1 bg-red-500 rounded-md"
                    onClick={() => deleteProduct(product.id)}>Удалить</button>

                {
                    isEditing ?

                        (<Button onClick={() => editProduct()} variant='solid' color='primary'>Сохранить</Button>)
                        :
                        (<button
                            className="px-2 py-1 bg-amber-500 rounded-md"
                            onClick={() => setIsEditing(true)}>Изменить</button>)
                }

            </div>
        </div>
    )
}
