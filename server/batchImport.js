const teachers = require("./data/teachers.json");
const reservations = require("./data/reservations.json");
const teams = require("./data/teams.json");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const batchImport = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("DF_Website");


        const teachersData = teachers.map((teacher) => {
            return {
                name: teacher.name,
                imgSrc: teacher.imgSrc,
                age: teacher.age,
                language: teacher.language,
                id: teacher.id,
                price: teacher.price,
                motto: teacher.motto,
                location: teacher.location,
                education: teacher.education,
                availability: teacher.availability,
            };
        });

        const reservationsData = reservations.map((reservation) => {
            return {
                name: reservation.name,
                user_id: reservation.user_id,
                teacher: reservation.teacher,
                reservation_id: reservation.reservation_id,
                availability: reservation.availability
            };
        });
        const teamsData = teams.map((team) => {
            return {
                name: team.name,
                imgSrc: team.imgSrc,
                age: team.age,
                location: team.location,
                education: team.education,
                school: team.school,
                position: team.position
            };
        });

        await db.collection("teachers").insertMany(teachersData);


        await db.collection("reservations").insertMany(reservationsData);
        await db.collection("teams").insertMany(teamsData);
    } catch (err) {
        console.log(err);
        client.close();
    }
    client.close();
};

batchImport();
