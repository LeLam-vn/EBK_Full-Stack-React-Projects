import express from "express";
// import authCtrl from '../controllers/auth.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('auth/signin').post(authCtrl.signin)
router.route('api/signout').get(authCtrl.signout)

export default router