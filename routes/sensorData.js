var express = require('express');
var router = express.Router();
var schemaSensor = require('../extra_modules/schemaSensor.js');
/* GET home page. */
router.get('/lastInserted', function(req, res, next) {
    schemaSensor.lastInserted(function(err, doc) {
        if(err) console.log(err);
        res.json(doc[0]);
    });
});
router.get('/lastInserted/:quant', function(req, res, next) {
    schemaSensor.groupLastInserted(req.params.quant,function(err,docs){
        if(err) console.log(err);
		res.json(docs);		
	});	  
});
router.get('/highestTemperature', function(req, res, next) {
    schemaSensor.highestTemperature(function(err, doc) {
        res.json(doc[0]);
    });
});
router.get('/lowestTemperature', function(req, res, next) {
    schemaSensor.lowestTemperature(function(err, doc) {
        res.json(doc[0]);
    });
});
router.get('/highestHumidity', function(req, res, next) {
    schemaSensor.highestHumidity(function(err, doc) {
        res.json(doc[0]);
    });
});
router.get('/lowestHumidity', function(req, res, next) {
    schemaSensor.lowestHumidity(function(err, doc) {
        res.json(doc[0]);
    });
});
router.get('/highestIluminity', function(req, res, next) {
    schemaSensor.highestIluminity(function(err, doc) {
        res.json(doc[0]);
    });
});
router.get('/lowestIluminity', function(req, res, next) {
    schemaSensor.lowestIluminity(function(err, doc) {
        res.json(doc[0]);
    });
});


/**
GET GROUP OF DATA BY HOUR OR DAYS
**/
router.get('/lastmaxperhours', function(req, res, next) {
    schemaSensor.orderByMaxInHours(function(err,docs){
        if(err) console.log(err);
        res.json(docs);     
    });   
});
router.get('/lastminperhours', function(req, res, next) {
    schemaSensor.orderByMinInHours(function(err,docs){
        if(err) console.log(err);
        res.json(docs);     
    });   
});
router.get('/lastavgperhours', function(req, res, next) {
    schemaSensor.orderByAvgInHours(function(err,docs){
        if(err) console.log(err);
        res.json(docs);     
    });   
});

router.get('/lastmaxperdays', function(req, res, next) {
    schemaSensor.orderByMaxInDays(function(err,docs){
        if(err) console.log(err);
        res.json(docs);     
    });   
});
router.get('/lastminperdays', function(req, res, next) {
    schemaSensor.orderByMinInDays(function(err,docs){
        if(err) console.log(err);
        res.json(docs);     
    });   
});
router.get('/lastavgperdays', function(req, res, next) {
    schemaSensor.orderByAvgInDays(function(err,docs){
        if(err) console.log(err);
        res.json(docs);     
    });   
});

module.exports = router;