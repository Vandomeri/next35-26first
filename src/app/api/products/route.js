import { prisma } from "@/lib/prisma"

export async function GET() {

    const products = await prisma.product.findMany()

    return Response.json(products)

}

export async function POST(request) {

    const body = await request.json()

    const createdProduct = await prisma.product.create({
        data: {
            title: body.title,
            price: body.price
        }
    })

    return Response.json({
        status: 'success',
        message: createdProduct
    })

}
