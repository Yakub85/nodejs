const express=require('express')
const app=express();
const db = require('./db')
require('dotenv').config();
const passport = require('./auth');
const bodyParser=require('body-parser')
app.use(bodyParser.json())
const PORT=process.env.PORT || 3000;

//Middleware Function
const logRequest =(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest)

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false})

app.get('/',function(req,res){
    res.send("Hello, Welcome to Hotels.")
})

//Import the router files
const personRouter = require('./routes/personRoutes')
const menuRouter = require('./routes/menuRoutes');
// const Person = require('./models/Person');
app.use('/person',personRouter)
app.use('/menu',menuRouter)



app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
    
});  