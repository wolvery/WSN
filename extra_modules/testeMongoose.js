
var wsnSchema = require('./schemaSensor.js');

function print(err,docs){
	if (err) console.error(err);
	console.log(docs);
}

wsnSchema.orderByMaxInHours(5,print);

