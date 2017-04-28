const express = require('express');
const router = express.Router();
const db = require('../db/queries');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/meals', db.createMeal); //CREATE
router.get('/meals', db.getAllMeals); //READ ALL
router.get('/meal', db.getOneMeal); //READ ONE
router.put('/update', db.updateMeal); //UPDATE
router.delete('/delete', db.deleteMeal); //DELETE

module.exports = router;

//change the action and the method
//the method will be get / post
//form will have action and method