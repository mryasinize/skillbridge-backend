import type { NextFunction, Request, Response } from "express";
import { analyticsService, createCategoryService, deleteCategoryService, getUsersService, moderateUserService, updateCategoryService } from "./admin.service";

export const analyticsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await analyticsService()
        res.json({
            success: true,
            data: stats
        })
    } catch (error) {
        next(error)
    }
};

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getUsersService(req.user!.userId)
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};

export const moderateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id as string
        const action: "BAN" | "UNBAN" = req.query.action as "BAN" | "UNBAN"
        await moderateUserService(userId, action)
        res.json({
            success: true,
            message: "User has been moderated successfully"
        })
    } catch (error) {
        next(error)
    }
};

export const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body
        const result = await createCategoryService(name)
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};

export const updateCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body
        const result = await updateCategoryService(req.params.id as string, name)
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};

export const deleteCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await deleteCategoryService(req.params.id as string)
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};
