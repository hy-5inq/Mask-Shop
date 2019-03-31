
const ServiceKey = `LtPYpmiQtkWL4J3r5I4i8wJ5osI78dqTCQRu4LJ0K3ceb5KVQx%2Bu%2F7fnuGe7udm5cibtD5dG5vMcAy52FDIHNQ%3D%3D`; // 나중에 숨기기 ..
const url = `http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty`;

const params = new Object({
	stationName: null,
	dataTerm: `month`,
	pageNo: `1`,
	numOfRows: `1`,
	ServiceKey: ServiceKey,
	ver: `1.3`,
}
);

exports.params = params;
exports.url = url;

