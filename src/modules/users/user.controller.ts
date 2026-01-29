import type { NextFunction, Request, Response } from "express";
import { getUserProfileService } from "./user.service";

export const getUserProfileController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getUserProfileService(req.user!.userId)
        res.json({
            success: true,
            data: {
                user: result
            }
        })
    } catch (error) {
        next(error)
    }
};

export const updateUserProfileController = (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
};