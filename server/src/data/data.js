const airPollutionInformation = require(`${__dirname}/../mongoModels`).airPollutionInformation; // mongoose database object
const fs = require(`fs`);
const request = require(`request`);
const createQueryParams = require(`./utils.js`).createQueryParams;
const stations = fs.readFileSync(`${__dirname}/config/stations.txt`, `utf8`).split(`\n`);

const params = require(`${__dirname}/config/data-config.js`).params;
const url = require(`${__dirname}/config/data-config.js`).url;

const xmlParser = require(`xml2json`);

const airPollution = require(`./utils.js`).airPollution;

for(const i in stations){
	const queryParams = createQueryParams(stations[i], params);
	request({
		url: url + queryParams,
		method: `GET`,
	}, (err, res, body) => {
		const jsonBody = JSON.parse(xmlParser.toJson(body));
		const item = jsonBody.response.body.items.item;
		try {
			airPollution.stationName = stations[i];
			airPollution.dataTime = new Date(item.dataTime);
			airPollution.so2Value = item.so2Value;
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
			airPollution.pm25Value = item.pm25Value;
			airPollution.pm10Grade1h = item.pm10Grade1h;
			airPollution.pm25Grade1h = item.pm25Grade1h;
			const input = new airPollutionInformation(airPollution);
			input.save((err, input) => {
				if (err) return console.error(err);
				input.verboseLog();})
		} catch (exception) {
			console.log(exception);
		}
	})
}
