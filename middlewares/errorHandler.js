
const errorHandler = (error, req, res, next) => {
	let status = 404;
	// let message = "Resource not found";
	let errors = "Resource not found";
	// let message = new Error("Ressource not found");

	if (error) {
		status = error.status || 500;
		// message = error.message;
		errors = [error.message];
		// message = new Error(error.message);
	}

	console.log(">> Error from global error handler: ", errors);
	// res.status(418);
	res.status(status);
	res.json({ errors });
};


export default errorHandler;
