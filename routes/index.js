const express = require('express');
const router = express.Router();
const db = require('../db/queries');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'BRUNCH!'
    });
});

router.post('/meals', db.createMeal); //CREATE
router.get('/meals', db.getAllMeals); //READ ALL
router.get('/meal', db.getOneMeal); //READ ONE
router.put('/update', db.updateMeal); //UPDATE
router.delete('/delete', db.deleteMeal); //DELETE

module.exports = router;