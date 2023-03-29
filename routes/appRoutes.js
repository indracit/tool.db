const express = require('express')
const router = express.Router()


router.route('/dashboard')
.get((req,res)=>{
    res.render('dashboard',{title:'App.ir | Dashboard'})})
    
router.route('/reports').get((req,res)=>{
    res.render('reports',{title:'App.ir | Reports'})
})

router.route('/monitoring').get((req,res)=>{
    res.render('monitoring',{title:'App.ir | Monitoring'})
})

router.route('/syncdata').get((req,res)=>{
    res.render('syncdata',{title:'App.ir | SyncData'})
})

router.route('/searchdetails').get((req,res)=>{
    res.render('searchdetails',{title:'App.ir | SearchDetails'})
})

module.exports=router