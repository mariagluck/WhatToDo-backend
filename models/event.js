// needs to register every user that puts an event on their wishlist users: [{ type: Schema.Types.ObjectId, ref: "regUsers"}]
import mongoose from "mongoose";
import moment from "moment";

// Helper variables
const required = true;
const unique = true;
const { Schema } = mongoose;
const date = moment.utc(); // is this done every time, there's a new instance of Event created?
// const rootImageUrl = `https://heroku.something.com`; --> we might need this as a pointer for the event images?

// Setting up event schema
const eventSchema = new Schema({
	name: { type: String, required },
	address: { type: String, required },
	category: {
		// type: [ { type: String, enum: ["Anything", "Free", "Music", "Workshop", "Film", "Family", "Market", "Exhibition", "Party", "Performing Arts", "Opening", "Food", "Reading"] } ], required // found this here, apparently then multi-select works for enums: https://stackoverflow.com/questions/27447876/is-it-possible-to-create-a-multi-select-enum-in-mongoose
		type: String,
		enum: [
            "Anything",
			"Free",
			"Music",
			"Workshop",
			"Film",
			"Family",
			"Market",
			"Exhibition",
			"Party",
			"Performing Arts",
			"Opening",
			"Food",
			"Reading",
		],
		required,
	},
	summary: { type: String, required },
	description: { type: String, required },

	// Date and Time
	// min 3 day ahead, max 6 months to the future
	start_date: {
		type: Date,
		// for seeding fakes // when you use .format("dddd, DD MMMM YYYY"), the output is type string, not type date!!
		// type: String,
	}, // see test.js for example how to use moment.js
	end_date: {
		type: Date,
		// for seeding fakes
		// type: String,
	},
	start_time: {
		type: Date,
		// for seeding fakes // when you use .format("HH:mm"), the output is type string, not type date!!
		// type: String,
	},
	end_time: {
		type: Date,
		// for seeding fakes
		// type: String,
	},

	// Prices and Booking
	free_event: { type: Boolean, required },
	price: { type: Number },
	booking_required: { type: Boolean, required },
	booking_site: { type: String },

	// Contact Details
	website: { type: String },
	email: { type: String },
	phone: { type: String }, 
	instagram: { type: String },
	facebook: { type: String },

	// Image
	// image: { type: Schema.Types.ObjectId, ref: "images"
	//     // event.path(image).get(value => `${rootImageUrl}/${value}`);
	// },
	image: String, // for seeding fake events

	// for CRUD actions on event listings
	author: { type: Schema.Types.ObjectId, ref: "regUsers" }, // user that created the event
	created_at: { type: Date, default: () => moment.utc() }, // or default: moment.utc // but this gives startOf("day") for some reason, not the time
	updated_at: { type: Date },
	deleted: { type: Date },

	wishlisting_users: [{ type: Schema.Types.ObjectId, ref: "regUsers" }],
	wishlist_count: { type: Number }, // event owner will only see number, no names
	users_attending: [{ type: Schema.Types.ObjectId, ref: "regUsers" }],
	attending_count: { type: Number }, // event owner will only see number, no names
});

// Indexing all text fields for keyword search
eventSchema.index({"$**": "text"});

// Setting up event model
const Event = mongoose.model("events", eventSchema);

export default Event;
