var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Classes = mongoose.model('Classes');
var Students = mongoose.model('Students');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.get('/classes', function(req, res, next) {
  Classes.find(function(err, classes){
    if(err){ return next(err); }

    res.json(classes);
  });
});

router.post('/classes', function(req, res, next) {
  var className = new Classes(req.body);

  className.save(function(err, post){
    if(err){ return next(err); }

    res.json(className);
  });
});


module.exports = router;
