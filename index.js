var express = require("express"); //Importar el framework express
var mongoose = require('mongoose');

var app = express(); //Inicializar la aplicacion con express

const PORT = process.env.PORT ||3000;


//Connection to the server
mongoose.connect('mongodb://administrador:administrador1@ds131323.mlab.com:31323/heroku_h81c8wth')
    .then(db => console.log('db.connected'))
    .catch(err => console.log(err));

app.use(express.static("public")); //Publicar un directorio de archivos estaticos
app.listen(PORT);//Levantar el servidor y escuchar en el puerto indicado