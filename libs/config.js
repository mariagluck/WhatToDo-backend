import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import moment from "moment";
import seed from "./seed.js";

// Load environment variables
// const { error } = dotenv.config(); // creates errors when deploying w/ heroku unfortunately
// if (error) {
//     console.log("Error while loading configuration from .env");
//     process.exit(1);
// }
dotenv.config();

if (!process.env.PORT) {
    console.log("Missing PORT variable, check .env");
    process.exit(1);
};

export default async function config(app) {
    // Middleware to log all requests (except favicon)
    app.use((req, res, next) => {
        if (req.path.indexOf("favicon") === -1) {
            console.log(`[REQ] ${req.method} ${req.path} --- Created_at: ${moment.utc().format()}`);
        }
        next();
    })

    // Enable Cross-origin-resource-sharing (frontend runs on different server)
    app.use(cors());
    // Enables to read JSONs in the req.body 
    app.use(express.json());


    // Seed database with some fake events (no users so far)
    await seed();
    console.log(">> Seeding events");
}