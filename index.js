var express = require("express"); //Importar el framework express

var app = express(); //Inicializar la aplicacion con express

const PORT = process.env.PORT ||3000;


app.use(express.static("public")); //Publicar un directorio de archivos estaticos
app.listen(PORT);//Levantar el servidor y escuchar en el puerto indicado