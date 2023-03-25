const {db} = require('../models/db')
const bcrypt = require('bcrypt')

const login = async (req,res)=>{
    console.log(req.body);
    const {username,password} = req.body
    const userdetails = await db('select username,password from appuser where username=:username',[username])
    console.log(userdetails);
    if(userdetails.rows.length==0)return res.json({message:'invalid username'})
    const match = await bcrypt.compare(password, userdetails.rows[0].PASSWORD);

    if(!match) return res.json({message:'invalid password'})
    req.session.isAuth=true
    res.redirect('/home')
    
}


const logout = async (req,res)=>{
    req.session.destroy()
    res.clearCookie('connect.sid') // clean up!
    return res.redirect('/')}

module.exports={login,logout}