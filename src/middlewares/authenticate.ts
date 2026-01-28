import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "../types/jwtPayload";
import { ApiError } from "../utils/ApiError";
import { verifyToken } from "../utils/jwt";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = (req.headers.authorization || req.headers.Authorization) as string

    if (!authHeader) {
        throw new ApiError(401, "No authorization header was found")
    }

    if (!authHeader.startsWith("Bearer")) {
        throw new ApiError(401, "Invalid token")
    }

    const token = authHeader.split(" ")[1]!

    const payload = verifyToken(token) as JwtPayload

    req.user = {
        userId: payload.userId,
        role: payload.role
    }
    next()
};
