"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const app = express();
// Below are methods that are included in express(). We chain them for convenience.
// --------------------------------------------------------------------------------

// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
app.use(morgan("tiny"));
app.use(express.json());
const port = 8000;
// // Any requests for static files will go into the public folder
// // .use(express.static("public"))

// Nothing to modify above this line
// ---------------------------------
// add new endpoints here 👇

// add new endpoints here ☝️
// ---------------------------------
// Nothing to modify below this line
app.get("/test", (req, res) => {
    res.status(200).json({ itWorked: true });
});
// this is our catch all endpoint.
app.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
    });
});

// Node spins up our server and sets it to listen on port number.
app.listen(port, () => console.log(`Listening on port ${port}`));