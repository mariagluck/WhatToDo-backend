import mongoose from "mongoose";

export default async function connect() {

    // Saving environment variables values from .env
    const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
    // Building connection string
    const connStr = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;
    // -----
    // For MongoDB Atlas use to be implemented in production
    // const { DB_URI } = process.env;
    // Connection string for MongoDB Atlas
    // const connStrAtlas = `${DB_URI}`;
    // -----

    // Event handlers for database connection
    mongoose.connection.on("error",
        e => console.log("[DB] Error", e) || process.exit(0));
    mongoose.connection.on("connecting", 
        () => console.log("[DB] Connecting"));
    mongoose.connection.on("connected", 
        () => console.log("[DB] Connected"));
    mongoose.connection.on("disconnecting", 
        () => console.log("[DB] Disconnecting"));
    mongoose.connection.on("disconnected", 
        () => console.log("[DB] Disconnected"));

    // Connect to database
    return await mongoose.connect(connStr);
    // -----
    // Connect to database in production
    // return await mongoose.connect(connStrAtlas, { useNewUrlParser: true, useUnifiedTopology: true })
    // -----
}