
var serialport = require("serialport");
var util = require('util');
var SerialPort = serialport.SerialPort;
var xbee_api = require('./lib/xbee-api.js');
var wsnSchema = require('./schemaSensor.js');
var C = xbee_api.constants;
var xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 2
});
var serialPort = new SerialPort("/dev/serial/by-id/usb-FTDI_FT232R
    _USB_UART_A403B7RU-if00-port0", {
    baudrate: 9600,
    parser: xbeeAPI.rawParser()
});
var frameObj = {
    type: 0xFE, // NEW 6LOWPAN FRAME IPHC, BROADCAST
    sendPort: 0x223d,
    dstPort: 0x223d,
    source64: "0013A20040C90E87",
    data: "changestate1" // Must be string.
};
exports.xbeePort = serialPort;

exports.sendFrame = function(data, callback) {
    frameObj.data = data;
    serialPort.write(xbeeAPI.buildFrame(frameObj), callback);
};
// All frames parsed by the XBee will be emitted here
exports.receiveMessage = function() {
    xbeeAPI.on("frame_object", function(frame) {

        var buffer = frame.data;
        if (buffer != undefined) {
            //remove udp header
            buffer = buffer.slice(10, buffer.length);
            var dataGroup = buffer.toString();

            //data has semicolons
            if (dataGroup != undefined) {
                if (dataGroup.indexOf(";") != -1) {                    
                    //sensor data
                    if (dataGroup.indexOf("Temperature") != -1) {
                        var data = dataGroup.split(";");
                        //each value is separated by colons
                        var novoDado = new wsnSchema.modelData({
                            temperature: data[0].split(":")[1],
                            humidity: data[1].split(":")[1],
                            light: data[2].split(":")[1],
                            iluminity: data[3].split(":")[1],
                            motion: data[4].split(":")[1]
                        }); //model, which our data will follow,
                        // based on the above schema           
                        wsnSchema.saveData(novoDado);
                    }
                    // relay data
                    else if (dataGroup.indexOf("In1") != -1) {
                        var data = dataGroup.split(";");
                        
                        var novoDado = new wsnSchema.modelRelay({
                            In1: data[0].split(":")[1],
                            In2: data[1].split(":")[1]
                        });
                        wsnSchema.saveRelay(novoDado);

                    }
                }
            }
        }

    });
};

