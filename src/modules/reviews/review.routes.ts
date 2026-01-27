import { Router } from "express";
import { createReviewController } from "./review.controller";

const reviewRouter = Router()

reviewRouter.post('/review', createReviewController)

export default reviewRouter