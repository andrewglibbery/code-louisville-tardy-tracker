var mongoose = require('mongoose');

var ClassesSchema = new mongoose.Schema({
  classPeriod: String,
  lates: {type: Number, default: 0},
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Students' }]
});

ClassesSchema.methods.newLate = function(cb) {
	this.lates += 1;
	this.save(cb);
};

mongoose.model('Classes', ClassesSchema);