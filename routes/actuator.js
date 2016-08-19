var express = require('express');
var sender = require('../extra_modules/portSicsLowpan.js');
var router = express.Router();
sender.receiveMessage();

/* Change State relay 1. */
router.get('/relay1', function(req, res, next) {
    var data = "changestate1";
    if (sender.xbeePort.isOpen()){
        sender.sendFrame(data,
        function(err, sent) {
            if (err) res.status(500).send('ERROR');
            return res.status(200).send('OK');
        });
    }else {
        res.status(500).send('ERROR');
    }
    
});
/* Change State relay 2. */
router.get('/relay2', function(req, res, next) {
    var data = "changestate2";
    sender.sendFrame(data,
        function(err, sent) {
            if (err) res.status(400).send('ERROR');
            return res.status(200).send('OK');
        });
});

module.exports = router;