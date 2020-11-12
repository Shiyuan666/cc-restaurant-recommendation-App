require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authentication = function(req, res, next){
    try{
        let token = req.cookies.token;
        jwt.verify(token, process.env.SECRET_KEY, function(err, decode){
            if(decode)
                return next();
            else{
                return next({
                    status:401,
                    message:"please log in"
                })
            }
        })
    }catch(e){
        let err = new Error("please log in");
        err.status = 401;
        return next(err);
    }
}

exports.authorization = function(req, res, next){
    try{
        let token = req.cookies.token;
        jwt.verify(token, process.env.SECRET_KEY, function(err, decode){
            if(decode && decode.id === req.params.id)
                return next();
            else{
                return next({
                    status:403,
                    message:"unauthorization"
                })
            }
        })
    }catch(e){
        let err = new Error("unauthorization");
        err.status = 403;
        return next(err);
    }
}