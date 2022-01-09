import mongoose from "mongoose";

// Helper variables
const required = true;
const unique = true;
const { Schema } = mongoose;

// Setting up image schema
const imageSchema = new Schema({
    originalname: { type: String, required },
    destination: { type: String, required }, // "uploads/"
    fieldname: { type: String, required }, // "selectedFile"
    mimetype: { type: String, required }, // e.g. "image/jpeg"
    filename: { type: String, required, unique }, // e.g. "c8f44ff6c3427cdd16fcab90e3ae1377"
    path: { type: String, required, unique }, // e.g. "uploads/c8f44ff6c3427cdd16fcab90e3ae1377"
    size: { type: Number, required },
})

// Setting up image model
const Image = mongoose.model("images", imageSchema);

export default Image;