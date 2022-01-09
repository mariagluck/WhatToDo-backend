import { body } from "express-validator";

const newEventRules = [
	body("name")
		.not()
		.isEmpty()
		.trim()
		.escape()
		.withMessage("Please give your listing a title"),
	body("name")
		.isLength({ min: 1, max: 50 })
		.withMessage("Please provide a listing name with 1 to 50 characters"),
	body("address")
		.not()
		.isEmpty()
		.trim()
		.escape()
		.withMessage("Please provide the address where your listing takes places"),
	body("address")
		.isLength({ min: 3, max: 100 })
		.withMessage("Please provide an address with 3 to 100 characters"),
	body("category")
		.isIn([
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
		])
		.not()
		.isEmpty()
		.withMessage("Please choose a category"),
	body("summary")
		.not()
		.isEmpty()
		.trim()
		.escape()
		.withMessage("Please provide a teaser for your listing"),
	body("summary")
		.isLength({ min: 3, max: 100 })
		.withMessage("Please provide a teaser with 3 to 100 characters"),
	body("description")
		.not()
		.isEmpty()
		.trim()
		.escape()
		.withMessage("Please provide some information about your listing"),
	body("description")
		.isLength({ min: 3, max: 1000 })
		.withMessage("Please provide a description with 3 to 1000 characters"),
	body("start_date")
		.isAscii()
		.trim()
		.escape()
		.withMessage("Please provide a start date"),
	body("end_date")
		.isAscii()
		.trim()
		.escape()
		.withMessage("Please provide an end date"),
	body("start_time")
		.isAscii()
		.trim()
		.escape()
		.withMessage("Please provide a start time"),
	body("end_time")
		.isAscii()
		.trim()
		.escape()
		.withMessage("Please provide an end time"),
	body("booking_site").trim().escape(),
	body("website")
		.isLength({ min: 5 })
		.trim()
		.escape()
		.withMessage("Website has to have at least 5 charcaters"),
	body("email")
		.isEmail()
		.normalizeEmail()
		.withMessage("Please provide a valid contact email address"),
	body("phone")
		.isNumeric({ no_symbols: false })
		.trim()
		.escape()
		.withMessage("Contact phone number format invalid"),
	body("phone")
		.isLength({ min: 5, max: 25 })
		.withMessage("Contact phone numbers has to be between 6 and 25 characters"),
	body("instagram")
		.isLength({ min: 3 })
		.trim()
		.escape()
		.withMessage("Instagram handle has to have at least 3 characters"),
	body("facebook")
		.isLength({ min: 3 })
		.trim()
		.escape()
		.withMessage("Facebook handle has to have at least 3 characters"),
	body("image").isLength({ max: 300 }).trim().escape().withMessage("Image URL can't be longer than 300 charcters"),
];

export default newEventRules;
