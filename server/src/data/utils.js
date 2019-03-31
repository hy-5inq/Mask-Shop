
function createQueryParams(stationName, params) {
	let queryParams = `?`;
	queryParams += `${  encodeURIComponent(`stationName`)  }=${  encodeURIComponent(stationName)}`;
	queryParams += `&${  encodeURIComponent(`dataTerm`)  }=${  encodeURIComponent(params.dataTerm)}`;
	queryParams += `&${  encodeURIComponent(`pageNo`)  }=${  encodeURIComponent(params.pageNo)}`;
	queryParams += `&${  encodeURIComponent(`numOfRows`)  }=${  encodeURIComponent(params.numOfRows)}`;
	queryParams += `&${  encodeURIComponent(`ServiceKey`)  }=${  params.ServiceKey}`;
	queryParams += `&${  encodeURIComponent(`ver`)  }=${  encodeURIComponent(params.ver)}`;
	return queryParams;
}
// http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=%EA%B4%91%EC%A7%84%EA%B5%AC%0D&dataTerm=month&pageNo=1&numOfRows=1&ServiceKey=LtPYpmiQtkWL4J3r5I4i8wJ5osI78dqTCQRu4LJ0K3ceb5KVQx%2Bu%2F7fnuGe7udm5cibtD5dG5vMcAy52FDIHNQ%3D%3D&ver=1.3
// http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=종로구&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=LtPYpmiQtkWL4J3r5I4i8wJ5osI78dqTCQRu4LJ0K3ceb5KVQx%2Bu%2F7fnuGe7udm5cibtD5dG5vMcAy52FDIHNQ%3D%3D&ver=1.3
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
