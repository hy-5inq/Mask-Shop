
function createQueryParams(stationName, params) {
	let queryParams = `?`;
	queryParams += `&${  encodeURIComponent(`stationName`)  }=${  encodeURIComponent(stationName)}`;
	queryParams += `&${  encodeURIComponent(`dataTerm`)  }=${  encodeURIComponent(params.dataTerm)}`;
	queryParams += `&${  encodeURIComponent(`pageNo`)  }=${  encodeURIComponent(params.pageNo)}`;
	queryParams += `&${  encodeURIComponent(`numOfRows`)  }=${  encodeURIComponent(params.numOfRows)}`;
	queryParams += `&${  encodeURIComponent(`ServiceKey`)  }=${  params.ServiceKey}`;
	queryParams += `&${  encodeURIComponent(`ver`)  }=${  encodeURIComponent(params.ver)}`;
	return queryParams;
}


let airPollution = {
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

exports.createQueryParams = createQueryParams;
exports.airPollution = airPollution;
