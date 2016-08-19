var serialport = require("serialport");
var util = require('util');
var SerialPort = serialport.SerialPort;
var xbee_api = require('./lib/xbee-api.js');
var wsnSchema = require('./schemaSensor.js');

var C = xbee_api.constants;
var xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 2
});
var serialPort = new SerialPort("/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A403B7RU-if00-port0", {
    baudrate: 9600,
    parser: xbeeAPI.rawParser()
});
serialPort.on('open', function() {
    console.log('Port open');
    var frameObj = {
        type: 0xFE, // NEW 6LOWPAN FRAME IPHC, BROADCAST
        sendPort: 0x223d,
        dstPort: 0x223d,
        source64: "0013A20040C90E87",
        data: "0123456789" // Must be string.
    }
    var actual = this;
    actual.buffer = xbeeAPI.buildFrame(frameObj);


    /*serialPort.write(actual.buffer,function(err, res) {
        if (err) throw (err);
        else console.log("written bytes: " + util.inspect(res));
    });*/

    //xbeeAPI.parseRaw(actual.buffer);
});
// All frames parsed by the XBee will be emitted here
xbeeAPI.on("frame_object", function(frame) {    
    var buffer = frame.data;
    if (buffer != undefined) {
        //remove udp header
        buffer = buffer.slice(10, buffer.length);
        var dataGroup = buffer.toString();
        //data has semicolons
        if (dataGroup.indexOf(";") != -1) {
             var data = dataGroup.split(";");
             //each value is separated by colons
             var novoDado = new wsnSchema.modelData({
                 temperature: data[0].split(":")[1],
                 humidity: data[1].split(":")[1],
                 light: data[2].split(":")[1],
                 iluminity: data[3].split(":")[1],
                 motion: data[4].split(":")[1]
             });//model, which our data will follow, based on the above schema           
             wsnSchema.saveData(novoDado);
        }
    }
});