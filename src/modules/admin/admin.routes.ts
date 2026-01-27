import { Router } from "express";
import * as controllers from "./admin.controller"

const adminRouter = Router()

adminRouter.get('/admin/analytics', controllers.analyticsController)
adminRouter.get('/admin/users', controllers.getUsersController)
adminRouter.patch('/admin/users/:id', controllers.updateUserController)
adminRouter.post('/admin/categories', controllers.createCategoryController)

export default adminRouter