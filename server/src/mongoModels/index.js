const mongoose = require(`mongoose`);
const airPollutionInformationSchema = require(`${__dirname  }/airPollutionInformation`);
const model = mongoose.model;

const dbName = `MaskShop`;

mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true});

const airPollutionInformation = model(`airPollutionInformation`, airPollutionInformationSchema);

const airPollution = {
	stationId: null,
	localName: null,
	stationName: null,
	dataTime: null,
	mangName: null,
	so2Value: null,
	coValue: null,
	o3Value: null,
	no2Value: null,
	pm10Value: null,
	pm10Value24: null,
	pm25Value: null,
	pm25Value24: null,
	khaiValue: null,
	khaiGrade: null,
	so2Grade: null,
	coGrade: null,
	no2Grade: null,
	pm10Grade: null,
	pm25Grade: null,
	pm10Grade1h: null,
	pm25Grade1h: null,
};

function item_to_airPollution(item){
	// airPollution.stationId = item.stationId;
	airPollution.localName = item.localName;
	airPollution.stationName = item.stationName;
	airPollution.dataTime = new Date(item.dataTime);
	airPollution.so2Value = item.so2Value;
	airPollution.coValue = item.coValue;
	airPollution.o3Value = item.o3Value;
	airPollution.no2Value = item.no2Value;
	airPollution.pm10Value = item.pm10Value;
	airPollution.pm10Value24 = item.pm10Value24;
	airPollution.pm25Value = item.pm25Value;
	airPollution.pm25Value24 = item.pm25Value24;
	airPollution.khaiValue = item.khaiValue;
	airPollution.khaiGrade = item.khaiGrade;
	airPollution.so2Grade = item.so2Grade;
	airPollution.coGrade = item.coGrade;
	airPollution.no2Grade = item.no2Grade;
	airPollution.pm10Grade = item.pm10Grade;
	airPollution.pm25Grade = item.pm25Grade;
	airPollution.pm10Grade1h = item.pm10Grade1h;
	airPollution.pm25Grade1h = item.pm25Grade1h;
	return airPollution;
}

function insert_air(air, localCode){
	const tot_cnt = air[`tot_cnt`];
	console.log(tot_cnt);
	for(let i = 0; i< tot_cnt; i++){
		const stationId = parseInt(localCode) + i;
		const stationCode = `item_${  String(stationId)}`;
		const item = air[stationCode];
		try {
			let input = item_to_airPollution(item);
			input = new airPollutionInformation(input);
			input.stationId = stationId;
			input.save((err, input) => {
				if(err) return console.log(err);
				input.verboseLog();
			})
		}
		catch (e) {console.log(e);
		}
	}
}

function empty_db(){
	airPollutionInformation.remove({}, (err) => {
		if(err) console.log(err);
		console.log(`all data removed`);
	})
}
module.exports = {
	insert_air: insert_air,
	empty_db: empty_db
};
