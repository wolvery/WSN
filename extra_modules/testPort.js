var sender = require('./portSicsLowpan.js');
sender.receiveMessage();

var callback = function() {
    var data = "changestate1";
    console.log(sender.xbeePort.isOpen());
    sender.sendFrame(data,
        function(err, sent) {
            if (err) console.warn('ERROR');
            return console.log('message2');
        });
};

setTimeout(callback,100)