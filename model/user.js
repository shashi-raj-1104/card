const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/card');

const userSchema = new mongoose.Schema({
    image: String,
    email: String,
    name: String,
    phone: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;