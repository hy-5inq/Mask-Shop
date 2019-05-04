const insert_air = require(`./mongoModels`).insertAir;
const fetch = require(`node-fetch`);
const parser = require(`xml2json`);

const map_local_code = [`10001`,`11003`,`12009`,`13002`,`15015`,`16008`,`17001`,`18003`,`19001`,`20003`,`21006`,`22002`,`23002`,`24005`,`25009`,`26001`,`14001`];
const map_local_kname = [`서울`,`인천`,`대전`,`대구`,`부산`,`울산`,`제주`,`광주`,`강원`,`충북`,`충남`,`전북`,`전남`,`경북`,`경남`,`경기`,`세종`];
const map_local_ename = [`seoul`,`incheon`,`daejeon`,`daegu`,`busan`,`ulsan`,`jeju`,`gwangju`,`gangwon`,`chungbuk`,`chungnam`,`jeonbuk`,`jeonnam`,`gyeongbuk`,`gyeongnam`,`gyeonggi`,`sejong`];
const n_locals = map_local_ename.length;

function crawling(){
	// kweather로 부터 데이터를 크롤링 합니다.
	/*
	{
	"air":{"tot_cnt": 이 지역의 item 수,
			"item_stationId": {"stationId": stationId,
								"localName": 지역,
								"stationName": 세부 지역(item),
								"dataTime"~"pm25Grade" <- 공공데이터 포털 API와 똑같음}
								} // item_stationId 가 tot_cnt 만큼 존재
			}
	}
	 */
	console.info(`Kweather로 부터 데이터를 받아 오는 중`);
	for(let i=0;i<n_locals;i++){
		const localCode = map_local_code[i];
		const localEname = map_local_ename[i];
		const local_url = `${`http://www.kweather.co.kr/air/data/api/air_1hr_`}${  localEname  }.xml`;
		fetch(`https://cors-anywhere.herokuapp.com/${  local_url}`,
			{"headers":{"accept":`*/*`,
				"accept-language":`ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7`,
				"cache-control":`no-cache`,
				"pragma":`no-cache`,
				"X-Requested-With": `XMLHttpRequest`},
			"referrer":`http://www.kweather.co.kr/air/air_present_me.html`,
			"referrerPolicy":`no-referrer-when-downgrade`,
			"body":null,
			"method":`GET`,
			"mode":`cors`}).then(
			data => data.text()).then(
			text => JSON.parse(parser.toJson(text)).air).then(air => insert_air(air, localCode))
	}

}


module.exports = {
	crawling: crawling
};
