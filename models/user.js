var mongoose = require('mongoose');

//Modelo para realizar acciones CRUD en la base de datos
module.export = mongoose.model('User', {
    username: String,
    password: String,
    email: String,
    gender: String,
    addres: String
});