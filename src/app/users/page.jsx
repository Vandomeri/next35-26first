import { prisma } from "@/lib/prisma"

export default async function UsersPage() {

    const data = await prisma.user.findMany({
        where: {
            AND: [
                {
                    email: 's@s.s'
                },
                {
                    age: 17
                }
            ]
        }
    })

    // SELECT * FROM `users` WHERE `age` = 17

    return (
        <div>
            <h1>Users List</h1>
            <div className="grid grid-cols-4">
                {
                    data.map(user => (
                        <div key={user.id}>
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                            <p>{user.age} лет</p>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}
