import shortUrlSchema from "../models/short_url.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    const newUrl = new shortUrlSchema({
        full_url: longUrl,
        short_url: shortUrl,
        clicks: 0,
    });
    if(userId) {
        newUrl.user = userId;
    }
    newUrl.save();
}