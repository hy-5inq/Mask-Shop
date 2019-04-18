const crawling = require(`./crawler.js`).crawling;
const resetAirPollutionInformations = require(`./mongoModels`).resetAirPollutionInformations;
const getAirPollutionInformation = require(`./mongoModels`).getAirPollutionInformation;
//
// resetAirPollutionInformations();
//
// crawling();
const map_local_code = [`10001`,`11003`,`12009`,`13002`,`15015`,`16008`,`17001`,`18003`,`19001`,`20003`,`21006`,`22002`,`23002`,`24005`,`25009`,`26001`,`14001`];
const map_local_kname = [`서울`,`인천`,`대전`,`대구`,`부산`,`울산`,`제주`,`광주`,`강원`,`충북`,`충남`,`전북`,`전남`,`경북`,`경남`,`경기`,`세종`];
const map_local_ename = [`seoul`,`incheon`,`daejeon`,`daegu`,`busan`,`ulsan`,`jeju`,`gwangju`,`gangwon`,`chungbuk`,`chungnam`,`jeonbuk`,`jeonnam`,`gyeongbuk`,`gyeongnam`,`gyeonggi`,`sejong`];

for(let i=0;i<map_local_code.length;i++){
	getAirPollutionInformation(map_local_code[i]).then(api => console.log(api));
}

