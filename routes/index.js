const express = require('express');
const router = express.Router();
const db = require('../db/queries');

/* GET home page. */
router.get('/', (req, res, next) => {
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

//change the action and the method
//the method will be get / post
//form will have action and method