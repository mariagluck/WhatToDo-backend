import faker from "faker";
import moment from "moment";
import Event from "../models/event.js";

export default async function seed() {
	// Firstly delete all fake events
	await Event.deleteMany({});

	// Helper arrays and functions
	const categories = [
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
	];
	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	// Array to hold the fake events
	const fakeEvents = [];

	// Create 256 fake events
	for (let i = 257; --i; ) {
		// Helper variables/functions
		const randomCategory = categories[getRandom(0, categories.length - 1)];
		const randomStartDate = moment().add(getRandom(0, 15), "days").startOf("hour");
        const randomEndDate = moment(randomStartDate).add(getRandom(0, 5), "days").add(getRandom(2, 7), "hours").startOf("hour");
        const isTrue = () => Math.random() < 0.5 ? false : true;

		// Event instance is created
		const event = await Event.create({
			name: faker.random.words(3),
			address: `${faker.address.streetAddress()}, ${faker.address.zipCode()}, Berlin`,
			category: randomCategory,
			summary: faker.random.words(7),
			description: faker.random.words(75),
			start_date: randomStartDate,
			end_date: randomEndDate,
			start_time: randomStartDate,
			end_time: randomEndDate,
			free_event: isTrue(),
            price: getRandom(0, 30),
			booking_required: isTrue(),
            booking_site: faker.internet.url(),
			website: faker.internet.url(),
			email: faker.internet.email(),
			phone: faker.phone.phoneNumber(),
			// image: faker.image.image(), // we have nicer default images in FE
            wishlist_count: getRandom(1, 250),
            attending_count: getRandom(1, 125)
		});

		fakeEvents.push(event);
	}
}
