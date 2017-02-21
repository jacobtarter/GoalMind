var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment= require('moment');

var diff = 'LOW MEDIUM HIGH'.split(' ');
var types = 'OPEN SINGLE REPEAT'.split(' '); //can change these
var rep = 'DAILY WEEKLY MONTHLY'.split(' '); //can change these


var SmartGoalSchema = new Schema({
  title: {type: String, required: true},
  description: String,
  user_id: {type: String, required: true},
  priority: {type: String, enum:diff},
  goal_type: {type: String, enum: types, required: true},
  due_date: Date,
  //repeat: {type: String, enum: rep},
  repeat: Number,
  completeDates: [Date],
  completesThisWeek: Number,
  complete: Boolean,
  date_created: {type: Date, default: moment().format()}

});


SmartGoalSchema.pre('save', function(next){
  if (this.goal_type == "SINGLE" && !this.due_date)
  {
    return next(new Error("ERROR: Must set due_date when goal_type is SINGLE"));
  }
  if (this.goal_type == "OPEN" && !this.priority)
  {
    return next(new Error("ERROR: Must set priority when goal_type is OPEN"));
  }
  else if (this.goal_type == "REPEAT" && !this.repeat)
  {
    return next(new Error("ERROR: Must set repeat when goal_type is REPEAT"));
  }
  next();

});

module.exports = mongoose.model('SmartGoal', SmartGoalSchema);
