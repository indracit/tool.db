module.exports = isAuth = async (req,res,next) =>{
    if(req.session.isAuth){
        next()
    }
    res.redirect('/auth')
}