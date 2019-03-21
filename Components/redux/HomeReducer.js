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
        
    ]

}

const homeReducer = (state = homeReducerInitialState , action) => {

    switch(action.type){

        default:

        return state

}

}

export default homeReducer
