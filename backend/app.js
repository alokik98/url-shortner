import express from 'express';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import connectDB from './src/config/mongo.config.js';
import shortUrlSchema from './src/models/short_url.model.js';

import shortUrlRoute from './src/routes/short_url.route.js';
import { redirectFromShortUrl } from './src/controller/short_url.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';

dotenv.config("./.env");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// POST: Create short url
app.use("/api/create", shortUrlRoute);

// GET: Redirection
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler)

app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port http://localhost:3000');
})