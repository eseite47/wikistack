const express = require ('express');
const user = require('./user.js');
const wiki = require('./wiki.js');

let router = express.Router();

router.use('/wiki', wiki);
router.use('/user', wiki);
router.use('/', function(req, res, next){
    res.render('layout');
})
module.exports = router; 