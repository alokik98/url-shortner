import axiosInstance from "../utils/axiosInstance"

export const createShortUrl = async (url) => {
    const {data} = await axiosInstance.post('/create', { url })
    return data.shortUrl
}