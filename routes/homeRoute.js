const express = require('express')
const router = express.Router()
const path = require('path')

router.route('/')
.get((req,res)=>{
    res.render('app')})


module.exports=router