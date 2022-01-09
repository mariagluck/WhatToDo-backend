import { validationResult } from "express-validator";

const validate = (rules) => {
	const middlewares = rules;
	middlewares.push((req, res, next) => {
		const result = validationResult(req);
		if (result.isEmpty()) {
			next();
			return;
		}

		console.log(result);
		res.status(400);
		//res.status(200);  otherwise the JSON is not sent to FE
		res.json({
			errors: result.errors.map((e) => e.msg),
            // errors: { errors.array() } // maybe this ? (Fahim Mentoring_12)
		});
	});
	return middlewares;
};

export default validate;
