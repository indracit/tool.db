const {db} = require('../models/db')


const login = async (req,res)=>{
    console.log(req.body);
    res.json({message:'api under construction'})
}

const refresh = async (req,res)=>{
    console.log(req.body);
    res.json({message:'api under construction'})
}

const logout = async (req,res)=>{
    console.log(req.body);
    res.json({message:'api under construction'})
}

module.exports={login,logout,refresh}