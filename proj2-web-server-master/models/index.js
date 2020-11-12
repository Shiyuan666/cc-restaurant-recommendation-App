const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://admin:96169123@restaurantrecomm-geitb.gcp.mongodb.net/test?retryWrites=true&w=majority`,{
    keepAlive: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected")
});

module.exports.User = require('./User');
module.exports.Todos = require('./Todos');