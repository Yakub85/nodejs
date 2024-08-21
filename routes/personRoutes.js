const express=require('express')
const router = express.Router()
const Person = require('../models/person');

//Post method to save data in person database
router.post('/',async(req,res)=>{
    try{
        const data = req.body; //Assuming the request body contains the person data
        
        //Create a new Person document using the Mongoose model
        const newPerson= new Person(data)

        //Save the new person to the database
        const response= await newPerson.save()
        console.log('data saved')
        res.status(200).send(response);
    }catch(err){
        console.log(err);
        res.status(400).send({ error: err.message });
    }
})

//Get method to get the person
router.get('/',async(req,res)=>{
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