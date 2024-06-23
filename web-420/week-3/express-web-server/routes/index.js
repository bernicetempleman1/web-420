var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Superhero App' });
});
module.exports = router;

/* GET users listing.
router.get('/', function(req, res, next) {
const name = 'name' in req.query ? req.query.name : 'Superhero';
res.render('superhero', {name: name});
});
module.exports = router;
*/