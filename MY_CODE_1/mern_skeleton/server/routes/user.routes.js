import express from "express";
import userCtrl from '../controllers/user.controller';
import authCrl from '../controllers/auth.controller'


const router = express.Router()

router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('api/user/:userId')
    .get(userCtrl.read)
    // .get(authCrl.requireSignin, userCtrl.read)
    .put(userCtrl.update)
    // .put(authCrl.requireSignin, authCrl.hasAuthorization, userCtrl.update)
    .delete(authCrl.hasAuthorization, userCtrl.remove)
    // .delete(authCrl.requireSignin, authCrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router