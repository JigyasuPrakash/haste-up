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
router.post('/getcollegebyname', (req, res) => {
    // request parameters
    let collegeName = req.body.collegename;

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
router.post('/getsimilarcolleges', (req, res) => {
    // initial blank result variable
    let result = [];

    // request paramets
    let city = req.body.city;
    let studentCount = Number(req.body.studentcount);
    let course = req.body.course.split(',');

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

// Get all colleges data
router.get('/getchartdata', (req, res) => {
    // Result variable initialise
    let gj = 0;
    let up = 0;
    let ap = 0;

    let cs = 0;
    let etron = 0;
    let mec = 0;
    let it = 0;
    let civ = 0;
    let man = 0;
    let ai = 0;
    let elec = 0;

    let result = {
        labels1: [],
        percentage1: [],
        labels2: [],
        percentage2: []
    };

    // Constraints on input
    let option = {};

    // accessing database
    let collection = database.collection('college_data');
    collection.find(option).forEach(ele => {
        switch (ele.state) {
            case "Gujarat": gj += ele.no_of_students; break;
            case "Uttar Pradesh": up += ele.no_of_students; break;
            case "Andhra Pradesh": ap += ele.no_of_students; break;
        }
        ele.courses.forEach(course => {
            switch (course) {
                case "Computer Science": cs++; break;
                case "Electronics": etron++; break
                case "Mechanical": mec++; break;
                case "Information Tech": it++; break;
                case "Civil": civ++; break;
                case "Management": man++; break;
                case "Artificial Intelligence": ai++; break;
                case "Electrical": elec++; break;
            }
        })
    }).then(() => {
        let t1 = gj + up + ap;
        let t2 = cs + etron + mec + it + civ + man + ai + elec;
        result.labels1 = ["Gujarat", "Uttar Pradesh", "Andhra Pradesh"];
        result.percentage1 = [(gj * 100 / t1), (up * 100 / t1), (ap * 100 / t1)];
        result.labels2 = ["Computer Science", "Electronics", "Mechanical", "Information Tech", "Civil", "Management", "Artificial Intelligence", "Electrical"];
        result.percentage2 = [(cs * 100 / t2), (etron * 100 / t2), (mec * 100 / t2), (it * 100 / t2), (civ * 100 / t2), (man * 100 / t2), (ai * 100 / t2), (elec * 100 / t2)]
        console.log(result);
        res.json(result);
    })
})

// Get students by college name
router.post('/getstudents', (req, res) => {
    let result = [];
    let collegeID = req.body.collegeID;
    console.log(collegeID)
    let option = {
        college_id: collegeID
    }

    let collection = database.collection('student_data');
    collection.find(option).forEach((student) => {
        result.push(student);
    }).then(() => {
        res.json(result);
    })
})

// Get Colleges List from Course/State name
router.post('/getcollegesfromchart', (req, res) => {
    let result = [];

    let state = req.body.state;
    let course = req.body.course;
    var options = {};

    if (state != null && course == null) {
        options = {
            state: state
        }
    } else if (course != null && state == null) {
        options = {
            courses: { $in: [course] }
        }
    }

    let collection = database.collection('college_data');
    collection.find(options).forEach(college => {
        result.push(college)
    }).then(() => {
        res.json(result);
    })
})

module.exports = router;