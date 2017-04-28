let pgp = require('pg-promise')();
require('dotenv').config();
let connString = process.env.DATABASE_URL;

let db = pgp(connString);

let createMeal = (req, res, next) => {
    // req.body.age = parseInt(req.body.age);
    db.none('insert into meals(item, note, rating, spicy, cost)' +
            'values(${item}, ${note}, ${rating}, ${spicy}, ${cost})',
            req.body)
        .then(() => {
            res.status(200)
                .json({
                    status: 'whoo-hoo',
                    message: 'One Meal Added'
                });
        })
        .catch((err) => {
            return next(err);
        });
};

let getAllMeals = (req, res, next) => {
    db.any('select * from meals') //.any() is one of PG-Promises methods
        .then((data) => {
            // console.log('DATA:', data);
            res.status(200)
                .json({
                    status: 'whoo-hoo',
                    data: data,
                    message: 'Yay All the Meals '
                })
        })
        .catch((err) => {
            return next(err);
        });
};

let getOneMeal = (req, res, next) => {
    let mealId = parseInt(req.params.id);
    db.one('select * from meals where id = $1', mealId) //.one() selects one from tasks
        .then((data) => {
            res.status(200)
                .json({
                    status: 'whoo-hoo',
                    data: data,
                    message: 'One Meal Was Grabbed'
                });
        })
        .catch((err) => {
            return next(err);
        });
};

let updateMeal = (req, res, next) => { //item, note, rating, spicy, cost
    db.none('update meals set item=$1, note=$2, rating=$1, spicy=$1, cost=$1 where id=$3', [req.body.item, parseInt(req.body.note), parseInt(req.body.rating), parseInt(req.body.spicy), parseInt(req.body.cost), parseInt(req.params.id)])
        .then(() => {
            res.status(200)
                .json({
                    status: 'whoo-hoo',
                    message: 'Task Updated'
                });
        })
        .catch((err) => {
            return next(err);
        });
};

let deleteMeal = (req, res, next) => {
    let mealId = parseInt(req.params.id);
    db.result('delete from meals where id = $1', mealId)
        .then((result) => {
            res.status(200)
                .json({
                    status: 'whoo-hoo',
                    message: `Removed ${result.rowCount} meal`
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