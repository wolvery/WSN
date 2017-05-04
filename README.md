# Wireless Sensor Networks THESIS
## About
Bachelor’s thesis to degree in Computer Engineering at CEFET-MG which consists of a implementation of a 6LoWPAN Wireless Sensor's Network sending data to a IPv6 Gateway. The Wireless sensors were Arduinos which monitored iluminity, temperature and humidity at some location. A website available at a Raspberry exhibit these data collected from the wireless network. Technologies used : C++,C, NodeJs, MongoDB.
## How To
To properly use this work, you need to set up at the mongodb database the follow schema:
```
/***
Schemas to be used as Models
***/
var relaySchema = new Schema({
    date: {
        type: Date, default: Date.now
    },
    In1: Number,
    In2: Number
});
var sensorSchema = new Schema({
    date: {
        type: Date, default: Date.now
    },
    temperature: Number,
    humidity: Number,
    motion: Boolean,
    light: Boolean,
    iluminity: Number
});
```

After creating these schemas in mongodb it is time to set up the arduinos to full data in.

