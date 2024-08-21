const express=require('express')
const router = express.Router()
const Menu = require('../models/menu');

router.post('/',async(req,res)=>{
    try{
        const data=req.body
        const newMenu=new Menu(data)

        const  response= await newMenu.save()
        console.log('data saved')
        res.status(200).send(response);
    }catch(err){
        console.log(err);
        res.status(400).send({ error: err.message });
    }
})

router.get('/',async(req,res)=>{
    try{
        const data=await Menu.find()
        console.log('data fetched')
        res.status(200).json(data)
    }catch(err){
        console.log(err);
        res.status(500).send({ error: 'Internal server error' });
    }
})
router.get('/:tasteType',async(req,res)=>{
    try{
        
        const tasteType=req.params.tasteType; //Extract the work type from the URL parameter
        if(tasteType=='sweet'||tasteType=='spicy'||tasteType=='sour'){
            const response = await Menu.find({taste: tasteType})
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

router.put('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;
        const updatedMenuData=req.body;

        const response= await Menu.findByIdAndUpdate(menuId,updatedMenuData,{
            new:true,
            runValidators:true,
        })
        if(!response){
            return res.status(404).json({error:'Menu not found'})
        }
        console.log('data updated');
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'})
        
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const menuId=req.params.id;
        const response=await Menu.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error:'Menu not found,'})
        }
        console.log('data deleted')
        res.status(200).json({message:'Menu item deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'})
    }
})

module.exports=router