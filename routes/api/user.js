const router = require("express").Router();
const userController = require("../../controllers/userController");


var user = require(/models/user);
// Matches with "/api/user"
router.route("/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

  //register

router.get('/register', function(req, res){
res.render('register');
});

  //login

  router.get('/login', function(req, res){
    res.render('login');
    }); 

//register user 

router.post ('/register',, function(req, res){
  name = req.body.name;
  email = req.body.email;
  username = req.body.username;
  password = req.body.password;
  password2 = req.body.password2;
  }); 

  //validation all fields required
req.checkBody('name', 'Name is Required').notEmpty(); 
req.checkBody('email', 'Email is Required').isEmail (); 
req.checkBody('username', 'User Name is Required').notEmpty(); 
req.checkBody('password', 'Password is Required').notEmpty(); 
req.checkBody('password2', 'Passwords do not match.').equals(req.body.password); 

//render form is errors
var errors = req.validationErrors();
if(errors){
res.render('users/register', {
errors:  errors 
});
}
else{
var newUser = new User({
  name: name,
  email: email,
  username: username,
  password = password
});
User.createUser(newUser, function(err, user) {
  if(err) throw err;
  console.log(user);
});
//flash
//msgs
//Where are we redirecting after registering
req.flash('success_msg', 'thank you for registering,');
res.redirect('/users/log')
}
});
module.exports = router;  