import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'

//Creating a new user
const create = async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save()
        return res.status (200).json({success:true, message:"Successfully signed up!"})
    }
    catch (error) {
        return res.status(400).json({success:false, error: errorHandler.getErrorMessage(error)})
    }
}


//Listing all users
const list = async (req,res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
    }
    catch (error) {
        return res.status(400).json({success:false, error: errorHandler.getErrorMessage(error)
        })
        }
}

//Loading a user by ID to read
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user)
            return res.status('400').json({
                error: "User not found"
            })
        req.profile = user
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}


//Reading a user
const read = (req,res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}


//Updating a user
const update = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        })
    }
}
//Remove a user
const remove = async (req,res) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    }
    catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        })
    }
}

export default {create, userByID, read, list, remove, update}