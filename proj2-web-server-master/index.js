require('dotenv').config();

const express = require('express');
const path = require('path');
const authRoutes = require('./routers/auth');
const todosRoutes = require('./routers/todos');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const whiteList = ['http://localhost:3000'];

const app = express()
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser())
app.use(bodyParser.json());
app.use((req,res,next)=>{
  if(whiteList.includes(req.headers.origin)){
    res.set({
      'Access-Control-Allow-Origin':'http://localhost:3000',
      'Access-Control-Allow-credentials': 'true',
      'Access-Control-Allow-Headers' : 'Origin,content-type',
      'Access-Control-Allow-Methods':'GET,PUT,DELETE,POST'
    })
    if(req.method === 'OPTIONS')
      return res.end();
  }
  return next();
})

app.use("/api/auth", authRoutes);
app.use("/api/todos", todosRoutes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(function(req,res,next){
  let err = new Error("404 Not found");
  err.status = 404;
  next(err);
})

app.use(function(err, req, res, next){
  return res.status(err.status||500).json({
    error:{
        message: err.message||`The server has some error!`
    }
  })
})

app.listen(process.env.PORT || 3001,()=>{
    console.log("server started");
})