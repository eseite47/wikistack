const express = require ('express');
const models = require('../models');
var Page = models.Page;
var User = models.User;

const router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {

    var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        // urlTitle: urlTitleGen(req.body.title)
    });

    page.save().then(function(savedPage){
        res.redirect(savedPage.route);
    })
    .catch(next)
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next){
    console.log('our custom url worked')
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
    .then(function(foundPage){
        console.log("foundPage", foundPage)
        res.render('wikipage', {title: foundPage.title, content: foundPage.content});
    })
    .catch(next)
})

module.exports = router; 

//helper functions

