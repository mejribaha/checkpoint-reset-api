const mongoose=require('mongoose')
const Schema = mongoose.Schema;

//the Schema defines structure of a document inside the DB
const UsersSchema = new Schema({
    name: {
        type: String,
        required:true,
    },
    age:{
        type: Number,
    }
});

const User= mongoose.model('User', UsersSchema);

module.exports= User;