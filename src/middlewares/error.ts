import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";

export const globalErrorHandler = (error: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500
    let message = "Internal Server Error"

    if (error instanceof ApiError) {
        statusCode = error.statusCode
        message = error.message
    } else if (error instanceof jwt.TokenExpiredError) {
        statusCode = 401
        message = "Invalid token"
    }

    console.log(error);
    res.status(statusCode).json({
        success: false,
        message: message
    })
};
