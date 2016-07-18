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

router.post('/classes/', function(req, res, next) {
  var className = new Classes(req.body);

  className.save(function(err, classes){
    if(err){ return next(err); }

    res.json(className);
  });
});

router.param('classes', function(req, res, next, id) {
  var query = Classes.findById(id);

  query.exec(function (err, classes){
    if (err) { return next(err); }
    if (!classes) { return next(new Error('can\'t find this class')); }

    req.classes = classes;
    return next();
  });
});

router.get('/classes/:classes', function(req, res) {
  res.json(req.classes);
});


module.exports = router;
