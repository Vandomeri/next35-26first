"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "./prisma"

export async function createUser(formData) {

    const user = await prisma.user.create({
        data: {
            age: Number(formData.get('age')),
            email: formData.get('email'),
            password: formData.get('password'),
            username: formData.get('username')
        }
    })

    revalidatePath('/users')

}

export async function deleteUser(id) {
    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/users')
}

export async function updateUser(user) {

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            age: user.age,
            email: user.email,
            password: user.password,
            username: user.username
        }
    })

    revalidatePath('/users')

}