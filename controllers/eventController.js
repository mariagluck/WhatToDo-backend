import moment from "moment";
import Event from "../models/event.js";
import User from "../models/user.js";
// import Image from "../models/image.js";

// Helper callback function
const callback = (error, result, response, next) => {
	if (error) {
		next(error);
		return;
	}
	response.json(result);
};

// landing page: you get all events happening today
const getEventsForToday = (req, res, next) => {
	// get same format as is in the database out of moment object (type: String)
	const today = moment();
	console.log(today);

	Event.find(
		{ start_date: { $lte: moment(today) }, end_date: { $gte: moment(today) } },
		(err, docs) => callback(err, docs, res, next)
	);
};

// get events using req.query
const getEvents = (req, res, next) => {
	const today = moment();

	const categoryFilter = req.body.category;
	const dateFilter = req.body.date;
	const keywordFilter = req.body.keyword;

	const filters = {};
	// Setting category if there is one
	if (categoryFilter && categoryFilter !== "Anything") {
		filters.category = categoryFilter;
	}

	// Setting start and end date filter if there is one
	if (dateFilter === "Anytime") {
		filters.end_date = { $gte: moment(today) };
		// filters.end_date = { $gte: moment() };
	} else if (dateFilter == "Today") {
		(filters.start_date = { $lte: moment(today) }),
			(filters.end_date = { $gte: moment(today) });
	} else if (dateFilter == "Tomorrow") {
		(filters.start_date = { $lte: moment(today) }),
			(filters.end_date = { $gt: moment(today) });
	} else if (dateFilter == "This weekend") {
		// Get the current weekday (Sunday (0) to Monday (6)) and set date parameters for Friday to Sunday
		switch (moment(today).day()) {
			case 0:
				(filters.start_date = { $lte: moment(today).subtract(2, "days") }),
					(filters.end_date = { $gte: moment(today) });
				break;
			case 1:
				(filters.start_date = { $lte: moment(today).add(4, "days") }),
					(filters.end_date = { $gte: moment(today).add(6, "days") });
				break;
			case 2:
				(filters.start_date = { $lte: moment(today).add(3, "days") }),
					(filters.end_date = { $gte: moment(today).add(5, "days") });
				break;
			case 3:
				(filters.start_date = { $lte: moment(today).add(2, "days") }),
					(filters.end_date = { $gte: moment(today).add(4, "days") });
				break;
			case 4:
				(filters.start_date = { $lte: moment(today).add(1, "days") }),
					(filters.end_date = { $gte: moment(today).add(3, "days") });
				break;
			case 5:
				(filters.start_date = { $lte: moment(today) }),
					(filters.end_date = { $gte: moment(today).add(2, "days") });
				break;
			case 6:
				(filters.start_date = { $lte: moment(today).subtract(-1, "days") }),
					(filters.end_date = { $gte: moment(today).add(1, "days") });
				break;
			default:
				break;
		}
	} else {
		// Getting date via datepicker in FE
		(filters.start_date = { $lte: moment(dateFilter) }),
			(filters.end_date = { $gte: moment(dateFilter) });
	}

	// Setting up filter by keyword, if there is one
	if (keywordFilter) {
		// ---- 2 versions for keyword search:
		// partial match: if you look for "Chicken Concrete", THIS will find "Chicken" and "Concrete" and "Chicken Concrete" (searches in all text fields)
		filters.$text = { $search: `^.*${keywordFilter}.*$` };
		// full match: if you look for "Chicken Concrete", THIS will look in the fields provided and find only "Chicken Concrete", no just "Chicken", or just "Concrete" events
		// filters.$or = [ { name: { $regex: `^.*${keywordFilter}.*$` } },
		// 	{ address: { $regex: `^.*${keywordFilter}.*$` } },
		// 	{ summary: { $regex: `^.*${keywordFilter}.*$` } },
		// 	{ description: { $regex: `^.*${keywordFilter}.*$` } }, ]
	}
	// Finding matching events in the database
	Event.find(filters, (err, docs) => callback(err, docs, res, next));
	// to find out more about errors during development
	// Event.find(filters, (err, docs) => {
	//     if (err) {
	//         res.status(500);
	//         res.json(err)
	//     }
	//     res.status(200);
	//     res.json(docs)
	// });
};

// user clicks on a event
const getEvent = (req, res, next) => {
	const eventId = req.params.eventId;
	Event.findOne({ _id: eventId }, (err, doc) => callback(err, doc, res, next));
};

const getWishlist = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });
		// user.populate('wishlist');
		// const wishlist = await user.exec();
		res.status(200);
		// res.json(wishlist);
		res.json(user.wishlist); // not working at the moment, getting error: 'Cast to ObjectId failed for value "wishlist" (type string) at path "_id" for model "events"'
	} catch (error) {
		next(error);
	}
};

const addToWishlist = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });
		const eventId = req.params.eventId;
		const event = await Event.findOne({ _id: eventId });
		// Add event to the user's wishlist
		if (!user.wishlist.includes(event._id)) {
			user.wishlist.push(event);
			await user.save();
		}
		// Add user to list of users having this event on their wishlist
		if (!event.wishlisting_users.includes(userId)) {
			event.wishlisting_users.push(user);
			await event.save();
		}
		res.status(200);
		res.json({
			success: `event ${event._id} added to wishlist, user ${user._id} added to event's wishlisting users`,
		});
	} catch (error) {
		next(error);
	}
};

const removeFromWishlist = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });
		const eventId = req.params.eventId;
		const event = await Event.findOne({ _id: eventId });
		if (
			!user.wishlist.includes(event._id) &&
			!event.wishlisting_users.includes(user._id)
		) {
			res.status(200);
			res.json({ success: "removed from wishlist" });
		}
		// Remove event from user's wishlist
		user.wishlist.splice(event._id, 1);
		await user.save();

		// Remove user from event's wishlisting users
		event.wishlisting_users.splice(user._id, 1);
		await event.save();

		res.status(200);
		res.json({
			success: `event ${event._id} removed from wishlist, user ${user._id} removed from event's wishlisting users`,
		});
	} catch (error) {
		next(error);
	}
};

const addEvent = async (req, res, next) => {
	console.log(req.file);

	try {
		// Get user/author creating the event from the database
		const userId = req.params.userId;
		const user = await User.findOne({ _id: userId });

		// Create new event with data from client-side
		const newEvent = await Event.create(req.body);

		// Save event as one of the user's listings (one-to-many)
		user.createdListings.push(newEvent);
		await user.save();

		// Set user as author/creator of the new event (one-to-one)
		newEvent.author = user._id;
		await newEvent.save((err, doc) => {
			if (err) {
				next(err);
				return;
			}
			// for testing:
			res.status(201);
			res.send(doc);
			// for production:
			// console.log(`>> New event ${doc._id}, title: "${doc.name}" saved to database. Created by ${doc.author}`);
			// res.status(201);
			// res.json({
			//     _id: doc.id,
			//     name: doc.name,
			//     start_date: doc.start_date
			// })
		});
	} catch (error) {
		next(error);
	}
};

const updateEvent = (req, res, next) => {
	res.send("works, but no frontend functionality");
};

const deleteEvent = (req, res, next) => {
	res.send("works, but no frontend functionality");
};

export {
	getEventsForToday,
	getEvents,
	getEvent,
	getWishlist,
	addToWishlist,
	removeFromWishlist,
	addEvent,
	updateEvent,
	deleteEvent,
};
