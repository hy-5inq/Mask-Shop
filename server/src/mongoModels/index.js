const mongoose = require(`mongoose`);
const airPollutionInformationSchema = require(`${__dirname  }/airPollutionInformation`);
const model = mongoose.model;

const dbName = `MaskShop`;

mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true});


module.exports = {
	airPollutionInformation: model(`airPollutionInformation`, airPollutionInformationSchema),
};
