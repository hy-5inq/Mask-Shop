const homeReducerInitialState = {

	imageGalleryItems : [

		{
			original: `./images/HomeGallery/elf_1080.jpg`,
			thumbnail: `./images/Homegallery/elf_640.jpg`
		},
		{
			original: `./images/HomeGallery/gas_1080.jpg`,
			thumbnail: `./images/Homegallery/gas_640.jpg`
		},
		{
			original: `./images/HomeGallery/kaneki_1080.jpg`,
			thumbnail: `./images/Homegallery/kaneki_640.jpg`
		},
		{
			original: `./images/HomeGallery/oni_1080.jpg`,
			thumbnail: `./images/Homegallery/oni_640.jpg`
		},
		{
			original: `./images/HomeGallery/smog_1080.jpg`,
			thumbnail: `./images/Homegallery/smog_640.jpg`
		},
		{
			original: `./images/HomeGallery/smog_1080.jpg`,
			thumbnail: `./images/Homegallery/smog_640.jpg`
		},
		{
			original: `./images/HomeGallery/smog_1080.jpg`,
			thumbnail: `./images/Homegallery/smog_640.jpg`
		},
		{
			original: `./images/HomeGallery/smog_1080.jpg`,
			thumbnail: `./images/Homegallery/smog_640.jpg`
		}
        
	],

	recommendedItems : [
		{
			src : `/home/rhodochrosited/tmp/server/imgs/3.jpg`,
			product : `3M 이지핏 황사마스크`,
			description : `#올해 가장 핫한 마스크 #50-80 #대형 #산업용 #3M`
		},
		{
			src : `/home/rhodochrosited/tmp/server/imgs/5.jpg`,
			product : `3Q 입체형 마스크`,
			description : `#올해 가장 핫한 마스크 #50-80 #중형 #황사용 #3M`
		},
		{
			src : `/home/rhodochrosited/tmp/server/imgs/32.jpg`,
			product : `크린탑 124`,
			description : `#너도 나도 사는 마스크! #50-80 #대형 #황사용 #크린탑`
		},
		{
			src : `/home/rhodochrosited/tmp/server/imgs/43.jpg`,
			product : `200보건용 마스크`,
			description : `#너도 나도 사는 마스크! #50-80 #중형 #산업용 #DOBU`
		},
	]



}

const homeReducer = (state = homeReducerInitialState , action) => {

	switch(action.type){

	default:

		return state

	}

}

export default homeReducer
