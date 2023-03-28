const {db} = require('../models/db')
const bcrypt = require('bcrypt')

const login = async (req,res)=>{
    const userdetails = await db('select username,password from appuser where username=:username',[username])
    if(userdetails.rows.length==0)return res.render('index',{message:'invalid username !!!'})
    const match = await bcrypt.compare(password, userdetails.rows[0].PASSWORD);

    if(!match) return res.render('index',{message:'invalid password !!!'})
    req.session.isAuth = true
    return res.redirect('/dashboard')
}


const logout = async (req,res)=>{
    req.session.destroy()
    res.clearCookie('connect.sid') // clean up!
    return res.redirect('/')}

module.exports={login,logout}