"use strict";

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// 1. GET: all teachers
const getTeachers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("DF_Website");
        const teachers = await db.collection("teachers").find().toArray();
        res.status(200).json({ status: 200, data: teachers });
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
};
// 2. GET: a specific teacher
const getOneTeacher = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("DF_Website");
        const teacher = await db.collection("teachers").findOne({ id: parseInt(req.params.teacher_id) });
        if (!teacher) {
            res.status(404).json({ status: 404, message: "teacher not found" });
        } else {
            res.status(200).json({ status: 200, data: teacher });
        }
    } catch (err) {
        console.error(err);
    }

    client.close();
};
// 3. POST: make a reservation
const makeReservation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const teacher_id = Number(req.body.teacher_id);
    const reservation_id = uuidv4();
    const reservation_year = req.body.reservation_year;
    const reservation_month = req.body.reservation_month;
    const reservation_day = req.body.reservation_day;
    const reservation_hour = req.body.reservation_hour;
    const user_phone = req.body.phone;
    const username = req.body.username;
    try {
        await client.connect();
        const db = client.db("DF_Website");
        // Check if the teacher is available
        const teacherDoc = await db.collection("teachers").findOne({
            id: teacher_id,
        });
        // If the teacher is not found, return an error message
        if (!teacherDoc) {
            return res.status(400).json({ status: 400, message: "Teacher not found" });
        }
        // Check if the teacher is available at that time
        const reservation_date = new Date(reservation_year, reservation_month - 1, reservation_day, Number(reservation_hour.substr(0, 2)), Number(reservation_hour.substr(3)));
        const day = reservation_date.getDay();
        const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];
        if (!teacherDoc.availability[dayName][reservation_hour]) {
            return res.status(400).json({ status: 400, message: "Teacher not available at that time" });
        }
        // Check if there is an existing reservation for the same teacher and time
        const existingReservation = await db.collection("reservations").findOne({
            teacher_id: teacher_id,
            reservation_year: reservation_year,
            reservation_month: reservation_month,
            reservation_day: reservation_day,
            reservation_hour: reservation_hour,
        });
        if (existingReservation) {
            return res.status(400).json({ status: 400, message: "Time already taken for this teacher!" });
        }
        // Create reservation object
        const reservation = {
            username: username,
            reservation_id: reservation_id,
            teacher_id: teacher_id,
            reservation_year: reservation_year,
            reservation_month: reservation_month,
            reservation_day: reservation_day,
            reservation_hour: reservation_hour,
            user_phone: user_phone,
        };
        // Insert reservation into database
        const result = await db.collection("reservations").insertOne(reservation);
        const newReservation = await db.collection("reservations").findOne({ reservation_id: reservation_id });
        // Return the reservation object
        return res.status(201).json({ status: 201, data: newReservation });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: 500, message: "Server error" });
    } finally {
        client.close();
    }
};


// 4. DELETE: delete a reservation 
const deleteReservation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("DF_Website");
        // find the reservation based on _id searched 
        const reservation = await db.collection("reservations").findOne({ reservation_id: req.params.reservation_id });
        if (!reservation) {
            return res.status(404).json({ status: 404, message: "reservation not found" });
        }
        // update "reservations" collection  
        const result = await db.collection("reservations").deleteOne({ reservation_id: req.params.reservation_id });
        if (result.deletedCount > 0) {
            res.status(200).json({ status: 200, message: "reservation deleted" });
        } else {
            res.status(404).json({ status: 404, message: "reservation not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    } finally {
        client.close();
    }
};

// 5. GET: all team members:
const getTeams = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("DF_Website");
        const teams = await db.collection("teams").find().toArray();
        res.status(200).json({ status: 200, data: teams });
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
};
// 5. GET: all reservations:
const getReservations = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("DF_Website");
        const reservations = await db.collection("reservations").find().toArray();
        res.status(200).json({ status: 200, data: reservations });
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
};
// 6. GET: a specific reservation based on reservation_id
const getOneReservation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("DF_Website");
        const reservation = await db.collection("reservations").findOne({ reservation_id: req.params.reservation_id });
        if (!reservation) {
            res.status(404).json({ status: 404, message: "reservation not found" });
        } else {
            res.status(200).json({ status: 200, data: reservation });
        }
    } catch (err) {
        console.error(err);
    }

    client.close();
};
module.exports = {
    getTeachers,
    getOneTeacher,
    makeReservation,
    deleteReservation,
    getTeams,
    getReservations,
    getOneReservation
};