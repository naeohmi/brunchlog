let pgp = require('pg-promise')();
require('dotenv').config();
let connString = process.env.DATABASE_URL;

let db = pgp(connString);

function createMeal(req, res, next) {
    req.body.age = parseInt(req.body.age);
    console.log('req.body ===>', req.body)
    db.none('insert into tasks(item, minutes)' +
            'values(${item}, ${minutes})',
            req.body)
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'One Task Inserted'
                });
        })
        .catch(function(err) {
            return next(err);
        });
};

function getAllMeals(req, res, next) {
    db.any('select * from meals') //.any() is one of PG-Promises methods
        .then(function(data) {
            console.log('DATA:', data);
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Yay Mealsssss '
                })
        })
        .catch(function(err) {
            return next(err);
        });
};

function getOneMeal(req, res, next) {
    let taskID = parseInt(req.params.id);
    db.one('select * from tasks where id = $1', taskID) //.one() selects one from tasks
        .then(function(data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'One Task Was Retrieved'
                });
        })
        .catch(function(err) {
            return next(err);
        });
};

function updateMeal(req, res, next) {
    db.none('update tasks set item=$1, minutes=$2 where id=$3', [req.body.item, parseInt(req.body.minutes), parseInt(req.params.id)])
        .then(function() {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Task Updated'
                });
        })
        .catch(function(err) {
            return next(err);
        });
};

function deleteMeal(req, res, next) {
    let taskID = parseInt(req.params.id);
    db.result('delete from tasks where id = $1', taskID)
        .then(function(result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} task`
                });
        })
        .catch(function(err) {
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