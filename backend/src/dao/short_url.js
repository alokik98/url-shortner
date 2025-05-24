import shortUrlSchema from "../models/short_url.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try {
        const newUrl = new shortUrlSchema({
            full_url: longUrl,
            short_url: shortUrl,
            clicks: 0,
        });
        if (userId) {
            newUrl.user = userId;
        }
        await newUrl.save();
    } catch (error) {
        if (error.code === 11000) {
            throw new ConflictError("Short URL already exists");
        }
        throw new Error(error);
    }
}

export const findUrlFromShortUrl = async (shortUrl) => {
    const url = await shortUrlSchema.findOneAndUpdate({ short_url: shortUrl }, { $inc: { clicks: 1 } });
    return url;
}