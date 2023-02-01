// server db integration\

//1. import mongoose
const mongoose = require('mongoose');

//2. state connection string via mongoose
mongoose.connect('mongodb://localhost:27017/BankServer',
{
    useNewUrlParser:true //To avoide unwanded warnings
});

//3. define Bank db model
const User=mongoose.model('User',
{
    //schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

//export collection
module.exports={
    User
}
