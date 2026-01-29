import type { NextFunction, Request, Response } from "express";
import type { Role } from "../generated/prisma/enums";
import { ApiError } from "../utils/ApiError";

export const checkRole = (role: keyof typeof Role) => (req: Request, res: Response, next: NextFunction) => {
    if (req.user!.role !== role) {
        throw new ApiError(403, "Forbidden. You don't have sufficient permission to perform this action")
    }
    next()
};
