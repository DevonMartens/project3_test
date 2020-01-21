const router = require("express").Router();
const userController = require("../../controllers/userController");

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

  //register

  router.get('/login', function(req, res){
    res.render('login');
    }); 
module.exports = router;  