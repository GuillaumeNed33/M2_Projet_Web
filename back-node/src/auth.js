const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send("Access denied. No token provided.");
    
    try {
        //if can verify the token, set req.user and pass to next middleware
        req.user = jwt.verify(token, process.env.JWT_PRIVATE);
        next();
    } catch (ex) {
        //invalid token
        res.status(400).send("Invalid token.");
    }
};
