const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
    try {
        const {authorization} = req.headers;

        if (!authorization) {
            return res.status(401).json({
                message: "Authorization header missing",
            });
        }

        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        req.user = decoded; 

        next();
    } catch (error) {
        res.status(401).json({
            message: "Authentication failed",
            error: error.message,
        });
    }
};

module.exports = checkAuth;
