const options = {
    method: 'GET',
    headers: { 'x-api-key': import.meta.env.API_KEY }
}

export const fetchCats = async () => {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=15`, options)
    const data = await response.json()
    return data
}