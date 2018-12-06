module.exports = function(app, passport) {
 app.get('/', function(req, res){
  res.render('index.ejs');
 });

 app.get('/login', function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });

 app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/inicio',
  failureRedirect: '/login',
  failureFlash: true
 }),
  function(req, res){
   if(req.body.remember){
    req.session.cookie.maxAge = 1000 * 60 * 3;
   }else{
    req.session.cookie.expires = false;
   }
   res.redirect('/');
  });

 app.get('/login', function(req, res){
  res.render('login.ejs', {message: req.flash('signupMessage')});
 });

 app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/menu',
  failureRedirect: '/login',
  failureFlash: true
 }));

 app.get('/index', function(req, res){
    res.render('index.ejs', {message: req.flash('hgvfghfgtj')});
   });

app.get('/registroUsuarios', function(req, res){
    res.render('registro-usuarios.ejs',{
        user:req.user
       });
    res.end();
    
});


app.post("/guardar", function (req, res) {
    connection.query(`
        INSERT INTO tbl_persona (cod_genero,telefono, nombre_persona, apellido_persona) 
        VALUES (?,?,?,?)`,
        [req.body.genero,req.body.telefono, req.body.nombre, req.body.apellidos],
        function (error, data, fields) {
            res.send(data);
            res.end();
        }
    );
    
});
app.post("/guardarUsua", function (req, res) {
    console.log(req.body.id, req.body.password,req.body.email);

    connection.query(`
        INSERT INTO tbl_usuario (id, username, password) 
        VALUES (?,?,?)`,
        [req.body.id, req.body.email, bcrypt.hashSync(req.body.password, null, null)],
        function (error, data, fields) {
            res.send(data);
            //console.log(data);
            res.end();
        }
    );
    
});


 app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/login');
 })
};


function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/');
}



