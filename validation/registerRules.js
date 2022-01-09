import { body } from "express-validator";

const registerRules = [
	body("name").not().isEmpty().trim().escape().withMessage("Please provide your name"),
	body("name").isLength({ min: 3, max: 20 }).withMessage("Please provide a name with 3 to 20 characters"),
	body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
	body("email").isLength({ min: 5 }).withMessage("Please provide a email with at least 5 characters"),
	body("password").isLength({ max: 65 }).withMessage("Password is too long"),
	body("password").isLength({ min: 8 }).isStrongPassword().withMessage("Password is too weak. Use at least 8 characters including 1 uppercase and 1 lowercase letter, 1 number and 1 symbol."),
];

export default registerRules;
