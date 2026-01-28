import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const globalErrorHandler = (error: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error instanceof ApiError ? error.statusCode : 500
    const message = error instanceof ApiError ? error.message : "Internal Server Error"
    console.log(error);
    res.status(statusCode).json({
        success: false,
        message: message
    })
};
