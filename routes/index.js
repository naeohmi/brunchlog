const express = require('express');
const router = express.Router();
const db = require('../db/queries');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/m/meals', db.createMeal); //CREATE
router.get('/m/meals', db.getAllMeals); //READ ALL
router.get('/m/meal', db.getOneMeal); //READ ONE
router.put('/m/update', db.updateMeal); //UPDATE
router.delete('/m/delete', db.deleteMeal); //DELETE

module.exports = router;

//change the action and the method
//the method will be get / post
//form will have action and method