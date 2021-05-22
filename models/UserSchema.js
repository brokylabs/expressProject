const mongoose      = require('mongoose')
const bcrypt        = require('bcrypt')

const UserSchema    = new mongoose.Schema({

    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    Date : {
        type : Date,
        default : Date.now()
    }

});

UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);