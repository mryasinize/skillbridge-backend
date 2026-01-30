import type { NextFunction, Request, Response } from "express";
import { getUserProfileService, getUserStatsService, updateUserProfileService } from "./user.service";
import { UpdateUserSchema, UserSchema } from "../auth/auth.schema";
import type { User } from "../../generated/prisma/client";

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

export const getUserStatsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getUserStatsService(req.user!.userId, req.user!.role)
        res.json({
            success: true,
            data: {
                stats: result
            }
        })
    } catch (error) {
        next(error)
    }
}

export const updateUserProfileController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UpdateUserSchema.parse(req.body) as Partial<User>
        const result = await updateUserProfileService(req.user!.userId, validatedData)
        res.json({
            success: true,
            message: "User updated successfully",
            data: {
                user: result
            }
        })
    } catch (error) {
        next(error)
    }
};