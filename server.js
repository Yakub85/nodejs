const express=require('express')
const app=express();
const db = require('./db')
const bodyParser=require('body-parser')
app.use(bodyParser.json())



app.get('/',function(req,res){
    res.send("Hello, Welcome to Hotels.")
})

//comment
//Import the router files
const personRouter = require('./routes/personRoutes')
const menuRouter = require('./routes/menuRoutes')
app.use('/person',personRouter)
app.use('/menu',menuRouter)



app.listen(3000,()=>{
    console.log('listening on port 3000');
    
});