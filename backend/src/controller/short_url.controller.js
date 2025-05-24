import { findUrlFromShortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUser } from "../services/short_url.service.js";
import tryCatchWrapper from "../utils/tryCatchWrapper.js";

export const createShortUrl = tryCatchWrapper(async (req, res) => {
    const { url } = req.body;
    const shortUrl = await createShortUrlWithoutUser(url);
    res.send(process.env.APP_URL + "/" + shortUrl);

})

export const redirectFromShortUrl = tryCatchWrapper(async (req, res) => {
    const { id } = req.params;
    const url = await findUrlFromShortUrl(id);
    if(!url) throw new Error("Short URL not found");
    res.redirect(url.full_url);
});