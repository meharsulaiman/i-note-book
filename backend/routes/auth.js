const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Salooisagoodb$oy";

// ROUTE 1: create a user using: POST "/api/auth/createuser". No login required
router.post(
    "/createuser",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Enter a valid password").isLength({ min: 5 }),
        body("name", "Password must be at least 8 charecters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res
                    .status(400)
                    .json({ error: "Sorry with this email is already exist" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal Server error occured");
        }
    }
);

// ROUTE 2: authenticate a user using: POST "/api/auth/login". No login required

router.post(
    "/login",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password can't be Blanked").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    error: "Please try to login with correct credentials",
                });
            }
            const passwordCompare = await bcrypt.compare(
                password,
                user.password
            );
            if (!passwordCompare) {
                return res.status(400).json({ errors: errors.array() });
            }
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal Server error occured");
        }
    }
);

// ROUTE 3: get loggedin user details using: POST "/api/auth/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal Server error occured");
    }
});
module.exports = router;
