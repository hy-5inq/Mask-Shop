const mongoose = require(`mongoose`);
const airPollutionInformationSchema = require(`${__dirname  }/airPollutionInformation`);
const model = mongoose.model;

const dbName = `MaskShop`;

mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true});

const airPollutionInformation = model(`airPollutionInformation`, airPollutionInformationSchema);

class airPollution{
	constructor(stationId, localName, stationName, dataTime, mangName, so2Value, coValue, o3Value, no2Value,
		pm10Value, pm10Value24, khaiValue, khaiGrade, so2Grade, coGrade, no2Grade, pm10Grade, pm25Grade, pm10Grade1h, pm25Grade15){
		this.stationId = stationId;
		this.localName = localName;
		this.stationName = stationName;
		this.dataTime = dataTime;
		this.mangName = mangName;
		this.so2Value = so2Value;
		this.coValue = coValue;
		this.no2Value = no2Value;
		this.pm10Value = pm10Value;
		this.pm10Value24 = pm10Value24;
		this.khaiValue = khaiValue;
		this.khaiGrade = khaiGrade;
		this.so2Grade = so2Grade;
		this.coGrade = coGrade;
		this.no2Grade = no2Grade;
		this.pm10Grade = pm10Grade;
		this.pm25Grade = pm25Grade;
		this.pm10Grade1h = pm10Grade1h;
		this.pm25Grade15 = pm25Grade15;
	}
}
function item_to_airPollution(stationId, item){
	// airPollution.stationId = item.stationId;
	const ap = new airPollution(stationId, item.localName, item.stationName, item.dataTime, item.mangName, item.so2Value, item.coValue, item.o3Value, item.no2Value,
		item.pm10Value, item.pm10Value24, item.khaiValue, item.khaiGrade, item.so2Grade, item.coGrade, item.no2Grade, item.pm10Grade, item.pm25Grade, item.pm10Grade1h, item.pm25Grade15);
	return ap;
}

function insertAir(air, localCode){
	/* air로부터 데이터를 파싱하여 MongoDB에 적절한 형태로 변환한 뒤 삽입 */
	const tot_cnt = air[`tot_cnt`];
	for(let i = 0; i< tot_cnt; i++){
		const stationId = parseInt(localCode) + i;
		const stationCode = `item_${  String(stationId)}`;
		const item = air[stationCode];
		try {
			let input = item_to_airPollution(stationId, item);
			input = new airPollutionInformation(input);
			input.save((err, input) => {
				if(err) return console.info(`FAILED TO INSERT ${stationCode}`);
				input.verboseLog();
			})
		}
		catch (e) {console.error(e);
		}
	}
}
function getAirPollutionInformation(stationId){
	const query = airPollutionInformation.where({stationId: stationId});
	return new Promise(((resolve, reject) => {
		query.findOne((err, api) => {
			if(err) reject(err);
			const airPollution = item_to_airPollution(stationId, api);
			resolve(airPollution);
		})
	}))
}

function resetAirPollutionInformations(){
	airPollutionInformation.remove({}, err => {
		if(err) console.error(err);
		console.info(`ALL DATA REMOVED`);
	})
}
module.exports = {
	insertAir: insertAir,
	resetAirPollutionInformations: resetAirPollutionInformations,
	getAirPollutionInformation: getAirPollutionInformation
};
