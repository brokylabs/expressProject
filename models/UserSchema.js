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

UserSchema.pre('save', async function(next){
    if(this.password){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
    

module.exports = mongoose.model('User', UserSchema);