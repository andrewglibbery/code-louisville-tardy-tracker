var mongoose = require('mongoose');

var StudentsSchema = new mongoose.Schema({
  studentName: String,
  tardies: {type: Number, default: 0},
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classes' }]
});


mongoose.model('Students', StudentsSchema);