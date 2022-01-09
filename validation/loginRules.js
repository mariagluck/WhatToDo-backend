import { body } from "express-validator";

const loginRules = [
	body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
	body("password").isLength({ max: 65 }).withMessage("Password is too long"),

];

export default loginRules;
