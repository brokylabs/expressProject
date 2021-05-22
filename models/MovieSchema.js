const mongoose          = require('mongoose')

const MovieSchema       = new mongoose.Schema({


    name : {
        type : String,
        require : true,
        trim : true
    },
    released_on : {
        type : Date,
        require : true,
        trim : true
    }
});

module.exports = mongoose.model('Movie', MovieSchema)