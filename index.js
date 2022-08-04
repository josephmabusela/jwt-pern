const express = require("express");
const app = express();
const cors = require("cors");

// MIDDLEWARE

app.use(express.json()); // REQ.BODY
app.use(cors());

// ROUTES

// REGISTER AND LOGIN ROUTES
app.use("/auth", require("./routes/jwtAuth"));

// DASHBOARD ROIUTE
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
	console.log("server started on port 5000");
});
