const jwt = require('jsonwebtoken');

let util = {};

util.successTrue = function(data){ //1 
  return {
    success:true,
    message:null,
    errors:null,
    data:data
  };
};

util.successFalse = function(err, message){ //2
  if(!err&&!message) message = 'data not found';
  return {
    success:false,
    message:message,
    errors:(err)? util.parseError(err): null,
    data:null
  };
};

util.parseError = function(errors){ //3
  let parsed = {};
  if(errors.name == 'ValidationError'){
    for(let name in errors.errors){
      let validationError = errors.errors[name];
      parsed[name] = { message:validationError.message };
    }
  } else if(errors.code == '11000' && errors.errmsg.indexOf('accountid') > 0) {
    parsed.accountid = { message:'This accountid already exists!' };
  } else {
    parsed.unhandled = errors;
  }
  return parsed;
};


// middlewares
util.isLoggedin = function(req,res,next){ //4
  let token = req.headers['x-access-token'];
  console.log(token);
  if (!token) return res.json(util.successFalse(null,'token is required!'));
  else {
    jwt.verify(token, "super-secret", function(err, decoded) {
      if(err) return res.json(util.successFalse(err));
      else{
      console.log(decoded);
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = util;