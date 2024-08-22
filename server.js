const express=require('express')
const app=express();
const db = require('./db')
require('dotenv').config();

const bodyParser=require('body-parser')
app.use(bodyParser.json())
const PORT=process.env.PORT || 3000;

app.get('/',function(req,res){
    res.send("Hello, Welcome to Hotels.")
})


//Import the router files
const personRouter = require('./routes/personRoutes')
const menuRouter = require('./routes/menuRoutes')
app.use('/person',personRouter)
app.use('/menu',menuRouter)



app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
    
});  