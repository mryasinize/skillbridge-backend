import type { NextFunction, Request, Response } from "express";
import { ReviewSchema } from "./review.schema";
import { createReviewService, deleteReviewService } from "./review.service";

export const createReviewController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = ReviewSchema.parse(req.body)
        const result = await createReviewService(req.user!.userId, validatedData)
        res.status(201).json({
            success: true,
            message: "Review added successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
};

export const deleteReviewController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewId = req.params.id as string
        const result = await deleteReviewService(req.user!.userId, reviewId)
        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
};