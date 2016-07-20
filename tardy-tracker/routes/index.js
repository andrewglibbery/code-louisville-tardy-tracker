var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Classes = mongoose.model('Classes');
var Students = mongoose.model('Students');

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

router.param('students', function(req, res, next, id) {
  var query = Students.findById(id);

  query.exec(function (err, students){
    if (err) { return next(err); }
    if (!students) { return next(new Error('can\'t find this student')); }

    req.students = students;
    return next();
  });
});

router.get('/classes/:classes', function(req, res) {
  req.classes.populate('students', function(err, classes) {
   res.json(req.classes); 
 });
});

router.post('/classes/:classes/students', function(req, res, next) {
  var student = new Students(req.body);
  student.post = req.classes;

  student.save(function(err, student){
    if(err){ return next(err); }

    req.classes.students.push(student);
    req.classes.save(function(err, classes) {
      if(err){ return next(err); }

      res.json(student);
    });
  });
});
router.put('/classes/:classes/newLate', function(req,res,next) {
  req.classes.newLate(function(err, classes) {
    if(err) {return next(err); }
    res.json(classes);
  });
});

router.put('/classes/:classes/students/:student/newTardy', function(req, res, next) {
  req.students.newTardy(function(err, student){
    if (err) { return next(err); }

    res.json(student);
  });
});


module.exports = router;
