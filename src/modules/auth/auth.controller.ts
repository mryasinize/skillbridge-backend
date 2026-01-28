import type { NextFunction, Request, Response } from "express";
import { LoginSchema, PasswordChangeSchema, UserSchema } from "./auth.schema";
import { changePasswordService, loginService, registerService } from "./auth.service";

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

export const changePasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = PasswordChangeSchema.parse(req.body)
        await changePasswordService(req.user!.userId, validatedData)
        res.json({
            success: true,
            message: "Password has been changed"
        })
    } catch (error) {
        next(error)
    }
};
