// (0) Requires
const Schema = require(`mongoose`).Schema;
// const SchemaObjectId = Schema.Types.ObjectId;

// (1) Define object
const airPollutionInformationSchema = new Schema({
	stationId: Number,
	localName: String,
	stationName: String,
	dataTime: Date,
	mangName: String,
	so2Value: Number,
	coValue: Number,
	o3Value: Number,
	no2Value: Number,
	pm10Value: Number,
	pm10Value24: Number,
	pm25Value: Number,
	pm25Value24: Number,
	khaiValue: Number,
	khaiGrade: Number,
	so2Grade: Number,
	coGrade: Number,
	no2Grade: Number,
	pm10Grade: Number,
	pm25Grade: Number,
	pm10Grade1h: Number,
	pm25Grade1h: Number,
});
// (2) Pre/post hooks
airPollutionInformationSchema.pre(`save`, next => {
	next()
});

// (3) Methods
airPollutionInformationSchema.methods.logThis = function() {
	console.log(`This is a reference to the instance`, this)
};
function verboseLog(){
	const log = this.stationName
		? `*** INSERTED airPollutionInformation ***
		station: ${  this.stationName}
		dataTime: ${  this.dataTime}`
		: `INSERTED airPollutionInformation's dataTime is Null`;
	console.info(log);
}
airPollutionInformationSchema.methods.verboseLog = verboseLog;

// (4) Statics
airPollutionInformationSchema.statics.logModel = function() {
	console.log(`This is a reference to the model`, this)
};

// (5) Export
module.exports = airPollutionInformationSchema;
