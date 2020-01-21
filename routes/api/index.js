const router = require("express").Router();
const userRoutes = require("./user");
const questionRoutes = require("./questions");

// User routes
router.use("/user", userRoutes);
//Questions routes
router.use("/questions", questionRoutes);

//get homepage
router.get('/', function(req, res){
    res.render('index');
});

module.exports = router;
 