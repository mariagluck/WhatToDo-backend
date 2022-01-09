import jwt from "jsonwebtoken";
import User from "../models/user.js";


// Get a list of all users
const getUsers = (req, res, next) => {
	res.send("works, but no frontend functionality");
};

const getUser = (req, res, next) => {
	res.send("works, but no frontend functionality");
};

// Add/register a new user
const addUser = async (req, res, next) => {

	try {
		// Check if user already exists
		const userCheck = await User.findOne({ email: req.body.email });
		if (userCheck) {
			// const err = new Error("Email already exists");
			res.status(400)
            res.json({ errors: ["Email already exists"] });
			// res.status = 401;
			// next(err);
			return;
		}

		// Add new user to the database
		const user = await User.register(req.body);
		console.log(
			`>> New user ${user._id}, username: "${user.name}" saved to database.`
		);
		// just to test the hashing
		// console.log(user.password);
		res.status(201);
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
		});
	} catch (error) {
		// To make sure no email address is published into the log
		if (error.message.indexOf("email") !== -1) {
			console.log(">> Error while registering user (email)");
			return res.status(400).json({ errors: ["Check inputs"] });
		}
		next(error);
	}
};

// Log in a registered user
const loginUser = async (req, res, next) => {
	try {
		const user = await User.login(req.body);
		if (!user) {
			// const err = new Error("User not found. Register first.");
			res.status = 400;
            res.json({ errors: ["User not found or password doesn't match"] })
			// next(err);
			
			return;
		}

		// Create JWT token
		const token = jwt.sign({ _id: user._id }, process.env.SECRET);

		res.status(200).json({ user, token });
	} catch (error) {
		next(error);
	}
};

// Update a user
const updateUser = (req, res, next) => {
	res.send("works, but no frontend functionality");
};

// Delete a user
const deleteUser = (req, res, next) => {
	res.send("works, but no frontend functionality");
};

export { getUsers, getUser, addUser, loginUser, updateUser, deleteUser };
