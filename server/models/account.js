const mongoose = require(`mongoose`);
const bcrypt   = require(`bcrypt-nodejs`);

const { Schema } = mongoose;
const accountSchema = new Schema({
	accountid:{
		type:String,
		required:[true,`Username is required!`],
		match:[/^.{4,12}$/,`Should be 4-12 characters!`],
		trim:true,
		unique:true
	},
	password:{
		type:String,
		required:[true,`Password is required!`],
		select:false
	},
	name:{
		type:String,
		required:[true,`Name is required!`],
		match:[/^.{2,12}$/,`Should be 2-12 characters!`],
		trim:true,
		unique:true
	},
	email:{
		type:String,
		required: true,
		match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,`Should be a vaild email address!`],
		trim:true
	},
	passwordQuestion:{
		type: Number,
		required: true
	},
	confirmPasswordQuestion:{
		type:String,
		required: true
	},
	postCode:{
		type:Number,
		required: true
	},
	address:{
		type:String,
		required: true
	},
	rank:{
		type:String,
		required: false
	},
	mileage:{
		type:String,
		required: false
	},
},{
	toObject:{virtuals:true}
});

// virtuals
accountSchema.virtual(`passwordConfirmation`)
	.get(function(){ return this._passwordConfirmation; })
	.set(function(value){ this._passwordConfirmation=value; });

accountSchema.virtual(`originalPassword`)
	.get(function(){ return this._originalPassword; })
	.set(function(value){ this._originalPassword=value; });

accountSchema.virtual(`currentPassword`)
	.get(function(){ return this._currentPassword; })
	.set(function(value){ this._currentPassword=value; });

accountSchema.virtual(`newPassword`)
	.get(function(){ return this._newPassword; })
	.set(function(value){ this._newPassword=value; });

// password validation
// const passwordRegex = /^[A-Za-z0-9]{6,12}$/;
// const passwordRegexErrorMessage = `Should be minimum 8 characters of alphabet and number combination!`;
// accountSchema.path(`password`).validate(function(v) {
// 	const account = this;
//
// 	// create account
// 	if(account.isNew){
// 		if(!account.passwordConfirmation){
// 			account.invalidate(`passwordConfirmation`, `Password Confirmation is required!`);
// 		}
// 		if(!passwordRegex.test(account.password)){
// 			account.invalidate(`password`, passwordRegexErrorMessage);
// 		} else if(account.password !== account.passwordConfirmation) {
// 			account.invalidate(`passwordConfirmation`, `Password Confirmation does not matched!`);
// 		}
// 	}
//
// 	// update account
// 	if(!account.isNew){
// 		if(!account.currentPassword){
// 			account.invalidate(`currentPassword`, `Current Password is required!`);
// 		}
// 		if(account.currentPassword && !bcrypt.compareSync(account.currentPassword, account.originalPassword)){
// 			account.invalidate(`currentPassword`, `Current Password is invalid!`);
// 		}
// 		if(account.newPassword && !passwordRegex.test(account.newPassword)){
// 			account.invalidate(`newPassword`, passwordRegexErrorMessage);
// 		} else if(account.newPassword !== account.passwordConfirmation) {
// 			account.invalidate(`passwordConfirmation`, `Password Confirmation does not matched!`);
// 		}
// 	}
// });

// hash password
accountSchema.pre(`save`, function (next){
	const account = this;
	if(!account.isModified(`password`)){
		return next();
	} 
	account.password = bcrypt.hashSync(account.password);
	return next();
	
});

// model methods
accountSchema.methods.authenticate = function (password) {
	const account = this;
	return bcrypt.compareSync(password,account.password);
};

// model & export
const Account = mongoose.model(`Account`,accountSchema);
module.exports = Account;
