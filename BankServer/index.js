// server creation

//import express

const express = require('express')

//import jwt
const jwt = require('jsonwebtoken')
//import dataservice
const dataService = require('./services/data.service');

//import cros
const cors= require('cors')


//creating an application for express 
const app = express();

//give command to share data via cors
app.use(cors({
    origin:['http://localhost:4200','http://192.168.0.124:8080','http://127.0.0.1:8080']
})
)
//to parse json from req body
app.use(express.json()) //type conversion
//create port number
app.listen(3000,()=>{
    console.log('Listening on port 3000');
})

//application specific middleware
// const appMiddleware =(req,res,next)=>{
//     console.log("Application specific middleware");
    
//     next();
// }
// app.use(appMiddleware);


//router specific midddleware
const jwtMiddleware=(req,res,next)=>{
    console.log('Router specific middleware');
    const token = req.headers['x-access-token'];
    //verify token - verify()
    const data=jwt.verify(token,'mykey');
    console.log(data);
    next();
}


//4. resolving http request
//get http request

// app.get('/',(req,res)=>{
//     res.send('Hello World')
// })

// app.post('/',(req,res)=>{
//     res.send('Request send')
// })

// app.put('/',(req,res)=>{
//     res.send('put Request')
// })

// app.patch('/',(req,res)=>{
//     res.send('patch Request')
// })

// app.delete('/',(req,res)=>{
//     res.send('delete Request')
// })


// api call
// registration request
app.post('/register',(req,res)=>{
    console.log(req.body);
    dataService.register(req.body.acno,req.body.username,req.body.pswd)//data
    .then(result=>{
        res.status(result.statusCode).json(result);
    })//access
    
    
})
// login request
app.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acno,req.body.password)//access
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
    
    
})
// deposit request
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.deposit(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
    
})
// withdraw request
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.withdraw(
        req.body.acno,
        req.body.pswd,
        req.body.amount,
        req.body.currentAcno
        )
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
    
    
})
// transaction request
app.post('/transaction',(req,res)=>{
    console.log(req.body);
    dataService.getTransaction(req.body.acno)
    .then(result=>
    {
        res.status(result.statusCode).json(result)
    })
    
    
})
// delete request
app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno)
    .then(result=>
    {
        res.status(result.statusCode).json(result)
    })
    
    
})