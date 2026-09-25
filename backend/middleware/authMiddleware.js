const jwt = require("jsonwebtoken");


// Verify JWT
const authenticateToken = (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({
                message: "Access token required"
            });
        }


        const parts =
            authHeader.split(" ");


        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {

            return res.status(401).json({
                message: "Invalid authorization format"
            });
        }


        const token = parts[1];


        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        req.user = decoded;


        next();

    } catch (error) {

        console.error("Authentication error:", error);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};


// Check admin
const requireAdmin = (req, res, next) => {

    if (!req.user) {

        return res.status(401).json({
            message: "Authentication required"
        });
    }


    if (req.user.role !== "admin") {

        return res.status(403).json({
            message: "Admin access required"
        });
    }


    next();
};


module.exports = {
    authenticateToken,
    requireAdmin
};