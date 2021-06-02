// Setup connection MongoDB
const mongoose          = require('mongoose')

const mongoDB           = 'mongodb://localhost/firstApp'


mongoose.connect(mongoDB, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false,
    useCreateIndex : true
}).then(() => console.log('mongoDB Connected!'));

mongoose.Promise = global.Promise;

module.exports = mongoose