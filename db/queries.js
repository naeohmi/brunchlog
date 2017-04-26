let pgp = require('pg-promise')();
require('dotenv').config();
let connString = process.env.DATABASE_URL;

let db = pgp(connString);

let createMeal = (req, res, next) => {
    req.body.age = parseInt(req.body.age);
    // console.log('req.body ===>', req.body)
    db.none('insert into meals(item, note, rating, spicy, cost)' +
            'values(${item}, ${minutes})',
            req.body)
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'One Meal Inserted'
                });
        })
        .catch((err) => {
            return next(err);
        });
};

let getAllMeals = (req, res, next) => {
    db.any('select * from meals') //.any() is one of PG-Promises methods
        .then((data) => {
            console.log('DATA:', data);
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Yay Mealsssss '
                })
        })
        .catch((err) => {
            return next(err);
        });
};

function getOneMeal(req, res, next) {
    let taskID = parseInt(req.params.id);
    db.one('select * from tasks where id = $1', taskID) //.one() selects one from tasks
        .then((data) => {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'One Task Was Retrieved'
                });
        })
        .catch((err) => {
            return next(err);
        });
};

let updateMeal = (req, res, next) => {
    db.none('update tasks set item=$1, minutes=$2 where id=$3', [req.body.item, parseInt(req.body.minutes), parseInt(req.params.id)])
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Task Updated'
                });
        })
        .catch((err) => {
            return next(err);
        });
};

let deleteMeal = (req, res, next) => {
    let taskID = parseInt(req.params.id);
    db.result('delete from tasks where id = $1', taskID)
        .then((result) => {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} task`
                });
        })
        .catch((err) => {
            return next(err);
        });
};
//CRUD
module.exports = {
    createMeal: createMeal, //CREATE
    getAllMeals: getAllMeals, //READ ALL
    getOneMeal: getOneMeal, //READ ONE
    updateMeal: updateMeal, //UPDATE
    deleteMeal: deleteMeal //DELETE
};