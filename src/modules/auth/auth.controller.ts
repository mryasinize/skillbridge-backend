import type { NextFunction, Request, Response } from "express";
import { LoginSchema, UserSchema } from "./auth.schema";
import { loginService, registerService } from "./auth.service";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UserSchema.parse(req.body)
        const data = await registerService(validatedData)
        res.status(201).json({
            success: true,
            message: "Registration successfull",
            data
        })
    } catch (error) {
        next(error)
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = LoginSchema.parse(req.body)
        const data = await loginService(validatedData)
        res.json({
            success: true,
            message: "Login successfull",
            data
        })
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
