const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    findUserByEmail,
    findUserById,
    createUser
} = require("../models/userModel");


// Register employee
const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            department
        } = req.body;


        // Validate input
        if (!name || !email || !password || !department) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // Check existing user
        const existingUser =
            await findUserByEmail(email);

        if (existingUser) {

            return res.status(409).json({
                message: "Email already registered"
            });
        }


        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Create user
        const result = await createUser(
            name,
            email,
            hashedPassword,
            department
        );


        res.status(201).json({

            message: "Employee registered successfully",

            userId: result.insertId
        });

    } catch (error) {

        console.error("Register error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// Login
const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({
                message: "Email and password are required"
            });
        }


        // Find user
        const user =
            await findUserByEmail(email);


        if (!user) {

            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Compare password
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Create JWT
        const token = jwt.sign(

            {
                id: user.id,
                email: user.email,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1h"
            }
        );


        res.json({

            message: "Login successful",

            token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            }
        });

    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// Get profile
const getProfile = async (req, res) => {

    try {

        const user =
            await findUserById(req.user.id);


        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });
        }


        res.json(user);

    } catch (error) {

        console.error("Profile error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


module.exports = {
    register,
    login,
    getProfile
};