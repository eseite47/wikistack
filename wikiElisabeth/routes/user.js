const express = require ('express');
const router = express.Router();

router.get('/:num', function(req, res, next) {
  res.send('redirect to a specific user id');
});

router.post('/', function(req, res, next) {
  res.send('create a user in the db');
});

router.put('/:num', function(req, res, next) {
  res.send('update user 123 in the db');
});

router.delete('/:num', function(req, res, next) {
  res.send('deletes user int the db');
});

module.exports = router;
