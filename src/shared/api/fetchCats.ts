export const fetchCats = async () => {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=15`,
        {
            method: 'GET',
            headers: { 'x-api-key': import.meta.env.VITE_API_KEY }
        })

    const data = await response.json()
    return data
}