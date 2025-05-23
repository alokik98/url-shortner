import { createShortUrlWithUser, createShortUrlWithoutUser } from "../services/short_url.service.js";

export const createShortUrl = async (req, res) => {
    const { url, userId } = req.body;
    if (!userId) {
        const shortUrl = await createShortUrlWithoutUser(url);
    } else {
        const shortUrl = await createShortUrlWithUser(url, userId);
    }
    res.send(process.env.APP_URL + "/" + shortUrl);
}