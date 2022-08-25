const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
	const jwtToken = req.header("token");

	if (!jwtToken) {
		return res.status(403).json({ msg: "authorization denied" });
	}

	try {
		const verify = jwt.verify(jwtToken, process.env.SECRET_KEY);

		req.user = verify.user;

		next();
	} catch (err) {
		res.status(401).json({ msg: "Token not valid" });
	}
};
