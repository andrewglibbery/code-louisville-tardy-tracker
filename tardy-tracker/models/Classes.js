var mongoose = require('mongoose');

var ClassesSchema = new mongoose.Schema({
  classPeriod: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Students' }]
});

mongoose.model('Classes', ClassesSchema);