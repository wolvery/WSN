var portSicsLowpan = require("./portSicsLowpan.js");

var frameObj = {
    type: 0xFE, // NEW 6LOWPAN FRAME IPHC, BROADCAST
    sendPort: 0x223d,
    dstPort: 0x223d,
    source64: "0013A20040C90E87", //mac addres of raspberry's xbee or gateway
    data: "0123456789" // Must be string.
};
portSicsLowpan.receiveMessage();


