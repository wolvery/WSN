var express = require('express');
var router = express.Router();

router.get('/home', function(req, res, next) {
  res.render('main');
});
router.get('/relay', function(req, res, next) {
  res.render('relay');
});
// charts
router.get('/charts', function(req, res, next) {
  res.render('chart');
});
router.get('/charthourly', function(req, res, next) {
  res.render('chartHour');
});
router.get('/chartdaily', function(req, res, next) {
  res.render('chartDay');
});
router.get('/chartaverage', function(req, res, next) {
  res.render('chartAVG');
});
/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wireless Sensor Networks' });
});
module.exports = router;
