var mongoose = require('mongoose');

var StudentsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  tardies: {type: Number, default: 0},
});

mongoose.model('Students', StudentsSchema);