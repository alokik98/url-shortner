import { saveShortUrl } from "../dao/short_url.js";
import { generateNanoId } from "../utils/helper.js";


export const createShortUrlWithoutUser = async (url) => {
    try {
        const shortUrl = generateNanoId(7);
        if (!shortUrl) { throw new Error("Failed to generate short URL"); }
        await saveShortUrl(shortUrl, url);
        return shortUrl;
    } catch (error) {
        throw new Error("Failed to create short URL: " + error.message);
    }
}

export const createShortUrlWithUser = async (url, userId) => {
    const shortUrl = generateNanoId(7);
    await saveShortUrl(shortUrl, url, userId);
    return shortUrl;
}