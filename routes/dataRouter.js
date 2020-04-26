const router = require('express').Router();
const keys = require('../config/keys');
const mongoClient = require('mongodb').MongoClient;

// Mongo Client configured
const client = new mongoClient(keys.mongoKey, { useUnifiedTopology: true, useNewUrlParser: true });
var database;
client.connect(err => {
    if (err) {
        console.err("Database Not Connected.. ", err);
    } else {
        database = client.db('haste_up');
        console.log("Connected");
    }
});

// Get College By Name endpoint
router.get('/getcollegebyname', (req, res) => {
    // request parameters
    let collegeName = req.query.collegename;

    // constraints on data
    let option = {
        name: collegeName
    };

    // accessing database
    const collection = database.collection('college_data');
    collection.findOne(option).then(element => {
        // sending single object as response
        res.json(element);
    })
})

// Get Similar Colleges endpoint
router.get('/getsimilarcolleges', (req, res) => {
    // initial blank result variable
    let result = [];

    // request paramets
    let city = req.query.city;
    let studentCount = Number(req.query.studentcount);
    let course = req.query.course;

    // constraints on similar data
    let option = {
        city: city,
        no_of_students: { $lt: studentCount + 200, $gt: studentCount - 200 },
        courses: { $in: course }
    };

    // accessing database
    const collection = database.collection('college_data');
    collection.find(option).forEach(ele => {
        result.push(ele);
    }).then(() => {
        console.log(result.length);
        res.json(result);
    })
});

// Get student List
router.get('/getstudentlistbycollegeid', (req, res) => {
    // Result variable initialize
    let result = [];

    // request parameters
    let collegeId = req.query.collegeid;
    console.log(collegeId);

    // constraints on data
    let option = {
        college_id: collegeId
    }

    // accessing database
    const collection = database.collection('student_data');
    collection.find(option).forEach(ele => {
        result.push(ele);
    }).then(() => {
        console.log(result.length)
        res.json(result);
    })
})

module.exports = router;