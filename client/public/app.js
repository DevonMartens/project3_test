var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
//var LocalStrategy = require('passport-local'),Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var mongo = require ('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongogb://localhost/loginapp');
var db = mongoose.connection;

//route exampeles
var routes = ('./routes/index')
var users ('./routes/users')

//init app

var app = express();

//view engine 
app.set('views', path_join(__dirname, 'views'));
//defaul layout file
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars'); 

//body parser and cookie parsers middleware 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//set static 'public' folder
//style sheet, images, jquery
app.use(express.static(path.join(__dirname, 'public')))

//middleware for express session
app.use(session({
    secret: 'secret'
    saveUninitialized: true,
    resave: true
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());
 
//middleware from validator 
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
, root  = namespace.shift() + ']';
, formParam = root;

while(namespace.length){
    formParam += '['+ namespace.shift() +']';
}
return {
    param : formParam,
msg: msg,
value: value
};
}
}));

//connect-flash middleware
app.use(flash());

//global variables for flash variables
//Success and error messages and error at bottom passport sets own error message
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//middleware for route files
//routes goes to index file FOR NOW
app.use('/', routes)
app.use('/users', users)
 
//set port
//do my OAuth go in dotenv
app.set('port'),(process.env.PORT || 3000)

app.listen(app.get('port'), function(){
    console.log('server started on port ' +app.get('port'));
}); 