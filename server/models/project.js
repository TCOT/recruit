var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    "publisher":String,
    "projectId": String,
    "projectName": String,
    "signUpTime":Array,
    "projectContent":String,
    "students":Array,
    "stuNum":Number
});

module.exports = mongoose.model("Project", projectSchema);