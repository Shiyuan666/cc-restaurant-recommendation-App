const db = require("../models");
const jwt = require("jsonwebtoken");  

exports.login = async function(req, res, next) {
  try {
    let user = await db.User.findOne({ username: req.body.username });
    let isMatched = await user.comparePassword(req.body.password);
    let { id, username } = user;
    if (isMatched) {
      let token = jwt.sign(
        {
          id,
          username,
        },
        process.env.SECRET_KEY
      );
      res.cookie('token', token, {expire: 360000 + Date.now()});thre
      return res.status(200).json({
        id,
        username
      });
    } else {
      return next({
        status: 400,
        message: "invalid password."
      });
    }
  } catch (e) {
    return next({
      status: 400,
      message: "username not found."
    });
  }
};

exports.signup = async function(req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, username } = user;
    let token = jwt.sign(
      {
        id,
        username
      },
      process.env.SECRET_KEY
    );
    res.cookie('token', token, {expire: 360000 + Date.now()});
    return res.status(200).json({
      id,
      username,
    });
  } catch (err) {
    console.log(`we have some err ${err}`);
    if ((err.code = 11000)) {
      return next({ message: "The username has already been taken" });
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.verify = async function(req, res, next) {
  try {
    let token = req.cookies.token;
    jwt.verify(token, process.env.SECRET_KEY, function(err, decode) {
      if (decode){
        let {id, username} = decode;
        return res.status(200).json({
          id,
          username,
        });
      }
      else {
        return next({
          status: 401,
          message: "please log in"
        });
      }
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};
