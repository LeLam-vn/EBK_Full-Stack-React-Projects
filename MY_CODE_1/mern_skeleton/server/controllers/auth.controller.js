import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from "../../config/config";

const signin = async (req,res) => {
    try {
        let user = await User.findOne({"email":req.body.email})
        if (!user)
            return res.status('401').json({success: false, message: 'User not found!-Login'})
        if(!user.authenticate(res.body.password)) {
            return res.status('401').send({error:"Email and password don't match."})
        }
        const token = jwt.sign({_id: user._id}, config.jwtSecret)
        res.cookie('t', token, {expire: new Date() + 9999})
        return res
            .status(200)
            .json({
                success:true,
                token,
                user:{
                    _id:user._id,
                    name: user.name,
                    email: user.email
                }
        })
    }
    catch (error) {
        return res.status('401').json({error:"Could not sign in"})
    }
}
const signout = (req,res) =>{
    res.clearCookie ('t')
    return res.status('200').json({
        message:"signed out"
    })
}

const requireSignin = expressJwt ({
    secret:config.jwtSecret,
    userProperty:'auth'
})
const hasAuthorization = (req,res, next) => {
    const authorized = req.profile && req.auth && req.profile._id ===req.auth._id
    if(!authorized){
        return res.status('403').json({success:false, error:'User is not authorized'})
    }
    next ()
}

export default {signin, signout, requireSignin, hasAuthorization}