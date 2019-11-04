const express = require('express');
router = express.Router();

router.get('/login', function(req, res){
    res.render('login', {
        title: 'Express Login'
    });
});

router.get('/', function(req, res){
    res.render('login', {
        title: 'Express Homepage'
    });
});

module.exports = router;