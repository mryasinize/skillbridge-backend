import { Router } from "express";
import { createReviewController } from "./review.controller";
import { authenticate } from "../../middlewares/authenticate";
import { checkRole } from "../../middlewares/checkRole";

const reviewRouter = Router()

reviewRouter.post('/review', authenticate, checkRole("STUDENT"), createReviewController)

export default reviewRouter