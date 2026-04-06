import axios from 'axios'

const $host = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers: {
        accept: "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
    },
})

export { $host }