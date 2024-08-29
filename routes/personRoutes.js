const express=require('express')
const router = express.Router()
const Person = require('../models/person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

//Post method to save data in person database
router.post('/signup',async(req,res)=>{
    try{
        const data = req.body; //Assuming the request body contains the person data
        
        //Create a new Person document using the Mongoose model
        const newPerson= new Person(data)
        //Save the new person to the database
        const response= await newPerson.save()
        console.log('data saved')

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));

        const token = generateToken(payload);
        console.log("Token is: ",token)

        res.status(200).json({response:response, token:token});
    }catch(err){
        console.log(err);
        res.status(400).json({ error: err.message });
    }
})

//login routes
router.post('/login',async(req,res)=>{
    try{
        //Extract username and password from request body
        const {username,password}=req.body
        //find the user by username
        const user =await Person.findOne({username:username});
        
        if(!user || (await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'})
        }

        //generate token
        const payload = {
            id:user.id,
            username:user.username
        }
        const token = generateToken(payload)

        //return token as  response
        res.json({token})
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//Profile routes
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user;
        console.log('User Data: ',userData);

        const userId=userData.id;
        const user =await Person.findById(userId)
        res.status(200).json({user});
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//Get method to get the person
router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try{
       const data=await Person.find()
       console.log('data fetched');
       res.status(200).json(data)
       
    }catch(err){
        console.log(err);
        res.status(400).send({ error: err.message });
    }
})


router.get('/:workType',async(req,res)=>{
    try{
        
        const workType=req.params.workType; //Extract the work type from the URL parameter
        if(workType=='chef'||workType=='waiter'||workType=='manager'){
            const response = await Person.find({work: workType})
            console.log('response fetched')
            res.status(200).json(response)
        }else{
            res.status(500).send({ error: 'Internal server error' });
        }
    }catch(err){
        console.log(err);
        res.status(500).send({ error:'Internal server error' });
    }
})

//Updated modules
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id; //Extract the id from the URL parameter
        const updatedPersonData=req.body;//Updated data for the person

        const response= await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true, // Return the updated document
            runValidators:true, //Run Mongoose Validation
        })
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }
        console.log('date updated');
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'})
        
    }
})

//Deleted module
router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id; //Extract the person's Id from the URL  parameter
       
        //Assuming you have a Person model

        const response = await Person.findByIdAndDelete(personId)
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'})
        
    }
})

module.exports=router