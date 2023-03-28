const express = require('express')
const router = express.Router()


router.route('/dashboard')
.get((req,res)=>{
    res.render('dashboard')})
    
router.route('/reports').get((req,res)=>{
    res.render('reports')
})

router.route('/monitoring').get((req,res)=>{
    res.render('monitoring')
})

router.route('/syncdata').get((req,res)=>{
    res.render('syncdata')
})

router.route('/searchdetails').get((req,res)=>{
    res.render('searchdetails')
})

router.route('/app').get((req,res)=>{
    res.render('app')
})



module.exports=router