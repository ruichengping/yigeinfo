var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.render('index/index',{
        activePage:'home'
    });
  }else{
    res.redirect("/login");
  }
});

module.exports = router;
