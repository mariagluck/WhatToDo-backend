import jwt from "jsonwebtoken";

const checkLogin = (req, res, next) => {
    const rawJWTHeader = req.headers.authorization;
    if (!rawJWTHeader) {
        return res.status(401).send("Unauthorized");
    };
    const tokenToCheck = rawJWTHeader.slice(7);
    jwt.verify(tokenToCheck, process.env.SECRET, (err, decoded) => {
        if (err) {
            const e = new Error("Error verifying JWT");
            e.status = 401;
            next(e);
            return;
        }
        // for testing
        // console.log(decoded);
        next();
    })
};

export default checkLogin;