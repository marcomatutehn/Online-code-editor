var express = require("express"); //Importar el framework express
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
//Modificar la ruta para que tenga acceso a la base de datos en MLab
var dbConfig = require('./db');
var mongoose = require('mongoose');
// Configuring Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');

//Inicializar la aplicacion con express
var app = express(); 

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static("public")); //Publicar un directorio de archivos estaticos

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));


// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//Conexion al servidor mLab para MongoDB
mongoose.connect(dbConfig.url)
    .then(db => console.log('db.connected'))
    .catch(err => console.log(err));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('No encontrado');
    err.status = 404;
    next(err);
});

app.use('/', routes);
app.use('/users', users);

const PORT = process.env.PORT ||3000;
app.listen(PORT);//Levantar el servidor y escuchar en el puerto indicado