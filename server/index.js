"use strict";

const { application } = require("express");
const express = require("express");
const morgan = require("morgan");

const {
    getTeachers,
    getOneTeacher,
    makeReservation,
    deleteReservation,
    getTeams,
    getReservations,
    getOneReservation
} = require("./handlers");
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
const port = 8000;

// 1. GET: all teachers
app.get("/api/teachers", getTeachers);
// 2. GET: a specific teacher
app.get("/teachers/:teacher_id", getOneTeacher);
// 3. POST: make a reservation
app.post("/post-reservation", makeReservation);
// 4. DELETE: delete a reservation 
app.delete("/delete-reservation/:reservation_id", deleteReservation);
// 5. GET: all team members
app.get("/teams", getTeams);
// 6. GET: all reservations
app.get("/reservations", getReservations);
// 7. GET: a specific reservation based on reservation ID 
app.get("/reservations/:reservation_id", getOneReservation);
// catch all endpoint.
app.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "┑(￣Д ￣)┍ This is obviously not what you are looking for.",
    });
});

// Node spins up our server and sets it to listen on port number.
app.listen(port, () => console.log(`Listening on port ${port}`));