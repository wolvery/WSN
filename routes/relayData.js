var express = require('express');
var router = express.Router();
var schemaSensor = require('../extra_modules/schemaSensor.js');
/* GET home page. */
router.get('/lastInserted', function(req, res, next) {
    schemaSensor.lastRelayInserted(function(err, doc) {
        if(err) console.log(err);
        res.json(doc[0]);
    });
});

module.exports = router;