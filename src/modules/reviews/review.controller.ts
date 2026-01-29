import type { NextFunction, Request, Response } from "express";
import { ReviewSchema } from "./review.schema";
import { createReviewService } from "./review.service";

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