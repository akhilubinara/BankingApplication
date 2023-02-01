
const jwt = require('jsonwebtoken')

// import db
const db=require('./db')


const register=(acno,username,pswd)=>{

      return db.User.findOne({acno})
      .then(user=>{
        if(user){
          return {
            status : false,
            statusCode : 400,
            message : 'user already registered'
          }
        }
        else{
          const newUser = new db.User({
            acno:acno,
            username:username,
            password:pswd,
            balance:0,
            transaction:[]
          })
        
      
      newUser.save();

      return {
        status : true,
        statusCode : 200,
        message : "register Successfull"
      }
    }
    })
      }
    

const login=(acno,password)=>{
  return db.User.findOne({acno})
  .then(user=>{
    if(user){
      if(user.password==password){
          currentUser = user.username;
          currentAcno = acno;
          const token = jwt.sign({currentAcno:acno},'mykey')
          return{
            status : true,
            statusCode : 200,
            message : "Login Successful",
            currentUser : currentUser,
            currentAcno : currentAcno,
            token : token
        }
      }
      else{
        return {
          status : false,
          statusCode : 422,
          message : `Incorrect Password`
        }
      }
      
    }
    else{
      return {
        status : false,
        statusCode : 422,
        message : "User Not Found"
      }
    }
  })
}

const deposit=(acno,pswd,amount)=>{

    var amt = parseFloat(amount);
    return db.User.findOne({acno,pswd})
    .then(user=>{
      if(user){
        user.balance +=amt;
        user.transaction.push({
          Type: 'Credit',
          Amount: amt
        })
        user.save();
        return {
          status: true,
          statusCode:200,
          message : `${amt} is credit balance is ${user.balance}`
        }
      }
      else{
        return {
          status : false,
          statusCode :400,
          message : 'Incorrect Userdetails'
        }  
    }
    })


  
}
const withdraw=(acno,pswd,amount,currentAcno)=>{
  var amt = parseFloat(amount);
    return db.User.findOne({acno,pswd})
    .then(user=>{
      if(user){
        if(user.balance>amt){
          user.balance -= amt;
        user.transaction.push({
          Type: 'Debit',
          Amount: amt
        })
        user.save()
        return {
          status: true,
          statusCode:200,
          message: `${amt} is debited and balance is ${user.balance}`
        }
        }
        else{
          return{
            status: false,
          statusCode:400,
          message: `insufficient balance`
          }
        }
      }
      else{
        return{
          status: false,
          statusCode:400,
          message: `invalid userdetails`
        }
      }
    })
}
const getTransaction=(acno)=>{
  return db.User.findOne({acno})
  .then(user=>{
    if(user){
      return {
        status : true,
        statusCode : 200,
        transaction : user.transaction
      }
    }
    else{
      return {
        status: false,
        statusCode:400,
        message: 'user not found'
      }
    }
  })
  
}

// To delete an account

const deleteAcc=(acno)=>{
  return db.User.deleteOne({acno})
  .then(user=>{
    if(user){
      return {
        status:true,
        statusCode:200,
        message:"Account Deleted"
      }
    }
    else{
      return {
        status:false,
        statusCode:400,
        message:"User Not found"
      }
    }
  })
}

module.exports={
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc
}
