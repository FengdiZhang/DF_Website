"use strict";

const express = require("express");
const morgan = require("morgan");

const {
    getTeachers,
    getOneTeacher,
    makeReservation,
    deleteReservation
} = require("./handlers");
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
const port = 8000;

// 1. GET: all teachers
app.get("/teachers", getTeachers);
// 2. GET: a specific teacher
app.get("/teacher/:teacher_id", getOneTeacher);
// 3. POST: make a reservation
app.post("/reservation", makeReservation);
// 4. DELETE: delete a reservation 
app.delete("/reservation/:reservation_id", deleteReservation);

// catch all endpoint.
app.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "┑(￣Д ￣)┍ This is obviously not what you are looking for.",
    });
});

// Node spins up our server and sets it to listen on port number.
app.listen(port, () => console.log(`Listening on port ${port}`));