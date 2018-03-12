var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "auth":String,
    "projects":Array,
    "info":Object,
    "draft":Object,
    "sDraft":Array
});

module.exports = mongoose.model("User", userSchema);