import { Router } from "express";
import * as controllers from "./tutor.controller"

const tutorRouter = Router()

tutorRouter.get('/tutors', controllers.getTutorsController)
tutorRouter.get('/tutors/:id', controllers.getTutorByIdController)
tutorRouter.patch('/tutor/profile', controllers.updateTutorProfileController)
tutorRouter.patch('/tutor/availability', controllers.updateTutorAvailabilityController)
tutorRouter.delete('/tutor/availability', controllers.deleteTutorAvailabilityController)
tutorRouter.get('/categories', controllers.getCategoriesController)

export default tutorRouter