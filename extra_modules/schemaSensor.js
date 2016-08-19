var mongoose = require('mongoose');
var options = {  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'replica' }};
options.server.socketOptions = options.replset
.socketOptions= { keepAlive: 1 };
mongoose.connect('mongodb://wolvery.local:27017/wsn',options);
var Schema = mongoose.Schema;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
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
/***
Models
***/
var sensorData = mongoose.model('sensorData', sensorSchema);
var relayData = mongoose.model('relayData', relaySchema);

exports.modelRelay = relayData;
exports.modelData = sensorData;
/* DATA SAVING MODULES */
exports.saveData = function(novoDado) { 
            novoDado.save(function(err) {
                if (err) console.log(err);
                console.log('recorded',novoDado);
            });   

};
exports.saveRelay = function(novoDadoRelay) { 
            novoDadoRelay.save(function(err) {
                if (err) console.log(err);
                console.log('relay recorded',novoDadoRelay);
            });   

};
/* SENSOR SECTION */
exports.lastInserted = function(callback){
			sensorData.find({}).sort({date: 1})
			.limit(1).exec(callback);
};

exports.groupLastInserted = function(n,callback){
			sensorData.find({}).sort({date: 1})
			.limit(n).exec(callback);
};
exports.highestTemperature = function(callback){
			sensorData.find({}).sort({temperature: -1})
			.limit(1).exec(callback);
};
exports.lowestTemperature = function(callback){
			sensorData.find({}).sort({temperature: 1})
			.limit(1).exec(callback);
};
exports.highestHumidity = function(callback){
			sensorData.find({}).sort({humidity: -1})
			.limit(1).exec(callback);
};
exports.lowestHumidity = function(callback){
			sensorData.find({}).sort({humidity: 1})
			.limit(1).exec(callback);
};
exports.highestIluminity = function(callback){
			sensorData.find({}).sort({iluminity: -1})
			.limit(1).exec(callback);
};
exports.lowestIluminity = function(callback){
			sensorData.find({}).sort({iluminity: 1})
			.limit(1).exec(callback);
};
exports.orderByMaxInHours = function(callback){

            sensorData.aggregate([{$group:{_id:{
    dayOfWeek: { $dayOfWeek: "$date" }, 
    day: { $dayOfMonth: "$date" },
    month: { $month: "$date" },
    hour: { $hour: "$date" }
},
    temperatures:{$max:"$temperature"},
    humidity:{$max:"$humidity"},
    iluminity:{$max:"$iluminity"}

}},{$sort:{_id:-1}},{$limit:24}]).exec(callback);
};
exports.orderByMinInHours = function(callback){
            sensorData.aggregate([{$group:{_id:{
    dayOfWeek: { $dayOfWeek: "$date" }, 
    day: { $dayOfMonth: "$date" },
    month: { $month: "$date" },
    hour: { $hour: "$date" }
},
    temperatures:{$min:"$temperature"},
    humidity:{$min:"$humidity"},
    iluminity:{$min:"$iluminity"}

}},{$sort:{_id:-1}},{$limit:24}]).exec(callback);
};
exports.orderByAvgInHours = function(callback){
            sensorData.aggregate([{$group:{_id:{
    dayOfWeek: { $dayOfWeek: "$date" }, 
    day: { $dayOfMonth: "$date" },
    month: { $month: "$date" },
    hour: { $hour: "$date" }
},
    temperatures:{$avg:"$temperature"},
    humidity:{$avg:"$humidity"},
    iluminity:{$avg:"$iluminity"}

}},{$sort:{_id:-1}},{$limit:24}]).exec(callback);
};
exports.orderByMaxInDays = function(callback){
            sensorData.aggregate([{$group:{_id:{
    dayOfWeek: { $dayOfWeek: "$date" }, 
    day: { $dayOfMonth: "$date" },
    month: { $month: "$date" }
},
    temperatures:{$max:"$temperature"},
    humidity:{$max:"$humidity"},
    iluminity:{$max:"$iluminity"}

}},{$sort:{_id:-1}},{$limit:30}]).exec(callback);
};
exports.orderByMinInDays = function(callback){
            sensorData.aggregate([{$group:{_id:{
    dayOfWeek: { $dayOfWeek: "$date" }, 
    day: { $dayOfMonth: "$date" },
    month: { $month: "$date" }
},
    temperatures:{$min:"$temperature"},
    humidity:{$min:"$humidity"},
    iluminity:{$min:"$iluminity"}

}},{$sort:{_id:-1}},{$limit:30}]).exec(callback);
};
exports.orderByAvgInDays = function(callback){
            sensorData.aggregate([{$group:{_id:{
    dayOfWeek: { $dayOfWeek: "$date" }, 
    day: { $dayOfMonth: "$date" },
    month: { $month: "$date" }
},
    temperatures:{$avg:"$temperature"},
    humidity:{$avg:"$humidity"},
    iluminity:{$avg:"$iluminity"}

}},{$sort:{_id:-1}},{$limit:30}]).exec(callback);
};
/* RELAY SECTION*/
exports.lastRelayInserted = function(callback){
			relayData.find({}).sort({date: -1})
			.limit(1).exec(callback);
};
