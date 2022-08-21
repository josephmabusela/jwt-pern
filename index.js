const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(express.json()); // REQ.BODY
app.use(cors());

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "client/build"));

// ROUTES

// REGISTER AND LOGIN ROUTES
app.use("/auth", require("./routes/jwtAuth"));

// DASHBOARD ROIUTE
app.use("/dashboard", require("./routes/dashboard"));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});
