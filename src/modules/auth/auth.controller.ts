import type { NextFunction, Request, Response } from "express";
import { UserSchema } from "./auth.schema";
import { registerService } from "./auth.service";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UserSchema.parse(req.body)
        const token = await registerService(validatedData)
        res.status(201).json({
            success: true,
            message: "Registration successfull",
            token
        })
    } catch (error) {
        next(error)
    }
};

export const loginController = (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
};

export const changePasswordController = (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
};
