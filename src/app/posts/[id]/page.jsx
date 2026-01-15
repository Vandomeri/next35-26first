export default async function ProductPage({ params }) {

    const { id } = await params

    const resp = await fetch(`https://jsonplaceholder.org/posts/${id}`)
    const data = await resp.json()

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
        </div>
    )
}
