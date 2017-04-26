var express = require('express');
var router = express.Router();
var db = require('../db/queries');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/createMeal', db.createMeal); //CREATE
router.get('/getAllMeals', db.getAllMeals); //READ ALL
router.get('/getOneMeal', db.getOneMeal); //READ ONE
router.get('/updateMeal', db.updateMeal); //UPDATE
router.get('/deleteMeal', db.deleteMeal); //DELETE

module.exports = router;