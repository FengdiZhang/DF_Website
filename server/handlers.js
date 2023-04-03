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
    const name = req.body.name;
    const user_id = req.body.user_id;
    const teacher = req.body.teacher;
    const reservation_id = uuidv4();
    const availability = req.body.availability;
    const reservation_day = availability.reservation_day;
    const reservation_time = availability.reservation_time;

    try {
        await client.connect();
        const db = client.db("DF_Website");
        // Check if the teacher is available
        const teacherDoc = await db.collection("teachers").findOne({
            name: teacher,
        });
        // If the teacher is not found, return an error message
        if (!teacherDoc) {
            return res.status(400).json({ status: 400, message: "Teacher not found" });
        }
        // If the teacher is not available, return an error message
        if (!teacherDoc.availability[reservation_day][reservation_time]) {
            return res.status(400).json({ status: 400, message: "Teacher not available at that time" });
        }
        // If the teacher is available, insert a new reservation into the database
        if (teacherDoc.availability[reservation_day][reservation_time]) {
            const insertedReservation = await db.collection("reservations").insertOne({ name, user_id, teacher, reservation_id, availability });
            if (!insertedReservation.insertedId) {
                // If the insertion fails, return an error message
                return res.status(500).json({ status: 500, message: "Failed to create a new reservation." });
            }
            // Update the teacher's availability for the requested time slot
            const updatedAvailability = await db.collection("teachers").updateOne({
                name: teacher,
            }, {
                $set: {
                    [`availability.${reservation_day}.${reservation_time}`]: false
                }
            });
            // If the update fails, return an error response
            if (!updatedAvailability.modifiedCount) {
                return res.status(500).json({ status: 500, message: "Failed to update teacher's availability." });
            }
            const result = await db.collection("reservations").findOne({ _id: insertedReservation.insertedId });
            res.status(200).json({ status: 200, data: result, message: "New reservation created!" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        await client.close();
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
        // update "teachers" collection 
        const teacher = await db.collection("teachers").findOne({ name: reservation.teacher });
        if (!teacher) {
            return res.status(404).json({ status: 404, message: "teacher not found" });
        }
        const reservation_day = reservation.availability.reservation_day;
        const reservation_time = reservation.availability.reservation_time;
        const updatedAvailability = await db.collection("teachers").updateOne({
            name: reservation.teacher,
        }, {
            $set: {
                [`availability.${reservation_day}.${reservation_time}`]: true
            }
        });
        if (!updatedAvailability.matchedCount) {
            return res.status(500).json({ status: 500, message: "Failed to update teacher's availability." });
        }
        // update "reservations" collection  
        const result = await db.collection("reservations").deleteOne({ reservation_id: req.params.reservation_id });
        if (result.deletedCount > 0) {
            res.status(200).json({ status: 200, message: "deleted" });
        } else {
            res.status(404).json({ status: 404, message: "reservation not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
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
module.exports = {
    getTeachers,
    getOneTeacher,
    makeReservation,
    deleteReservation,
    getTeams
};