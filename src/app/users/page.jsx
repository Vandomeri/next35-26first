
import { prisma } from "@/lib/prisma"
import UsersTable from "./UsersTable"

export default async function UsersPage() {

    const data = await prisma.user.findMany()

    console.log(data)

    return (
        <div>
            <h1>Users List</h1>
            <UsersTable data={data} />


        </div>
    )
}
