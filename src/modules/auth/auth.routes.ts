import { Router } from "express";
import * as controllers from "./auth.controller"

const authRouter = Router()

authRouter.post('/auth/register', controllers.registerController)
authRouter.post('/auth/login', controllers.loginController)
authRouter.get('/auth/change-password', controllers.changePasswordController)

export default authRouter