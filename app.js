var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//ruta de la home
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Rutas de busqueda, generos y detalles.
let busquedasRouter = require("./routes/busquedas");
let generosRouter = require("./routes/generos");
let detallesRouter = require("./routes/detalles");
let registroRouter = require('./routes/registros');
let loginRouter = require('./routes/login');
let reseñasRouter = require('./routes/reseñas');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use("/buscar", busquedasRouter);
app.use("/generos", generosRouter);
app.use("/detalles", detallesRouter);
app.use('/registros', registroRouter);
app.use('/login', loginRouter);
app.use('/resenias', reseñasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
