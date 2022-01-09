import express from "express";
import config from "./libs/config.js";
import connect from "./libs/database.js";
import eventRouter from "./router/eventRouter.js";
import userRouter from "./router/userRouter.js";
import errorHandler from "./middlewares/errorHandler.js";


// Setup express and connect to database
const server = express();
config(server);
connect(server);

// Endpoint to filter events
server.use("/events", eventRouter);

// Endpoint for registration and login, create listings, wishlist
server.use("/users", userRouter);

// Endpoint to handle errors
server.use(errorHandler);

// Connect to port
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`>> Server started listening on http://localhost:${PORT}`)
})