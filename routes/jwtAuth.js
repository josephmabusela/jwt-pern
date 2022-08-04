const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");

//1. BUILDING FOR REGISTERING A NEW USER FOLLOWING THE DATABASE STRUCTURE
// REGISTERING ROUTE
router.post("/register", validInfo, async (req, res) => {
	try {
		// STEP1. DESTRUCTURE THE req.body (name, email, password)
		const { email, name, password } = req.body;

		// STEP2. CHECK IF USER EXISTS (IF USER EXISTS THEN THROW ERROR)
		const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
			email,
		]);

		if (user.rows.length > 0) {
			return res.status(401).send("User already exists");
		}

		// STEP3. BCRYPT THE USER PASSWORD
		const salt = await bcrypt.genSalt(10);
		const bcryptPassword = await bcrypt.hash(password, salt);

		// STEP4. ENTER THE NEW USER INSIDE OUR DATABASE
		const newUser = await pool.query(
			"INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
			[name, email, bcryptPassword]
		);
		// res.json(newUser.rows[0]);

		// STEP5. GENERATE token
		const token = jwtGenerator(newUser.rows[0].user_id);

		res.json({ token });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send("Server Error");
	}
});

//2. BUILDING FOR AUTHENTICATING AN EXISTING USER ONCE REGISTERED THEN LOGGING IN
// LOGIN ROUTE
router.post("/login", validInfo, async (req, res) => {
	// STEP1. DESTRUCTURE THE req.body
	const { email, password } = req.body;

	try {
		// STEP2. CHECK IF USER DOESN'T EXIST (IF NOT, THROW ERROR)
		const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
			email,
		]);

		if (user.rows.length === 0) {
			return res.status(401).send("Password or Email is incorrect");
		}

		// STEP3. CHECK IF INCOMING PASSWORD IS THE SAME AS THE DATABASE PASSWORD
		const validPassword = await bcrypt.compare(
			password,
			user.rows[0].user_password
		);

		// console.log(validPassword)
		if (!validPassword) {
			return res.status(401).send("Password or Email is incorrect");
		}

		// STEP4. GIVE USER THE JWT token
		const token = jwtGenerator(user.rows[0].user_id);
		return res.json({ token });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.get("/is-verify", authorize, async (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
