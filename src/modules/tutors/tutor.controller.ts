import type { NextFunction, Request, Response } from "express";
import { getTutorsService } from "./tutor.service";

export const getTutorsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getTutorsService()
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};

export const getTutorByIdController = (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
};

export const updateTutorProfileController = (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
};

export const updateTutorAvailabilityController = (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
};

export const deleteTutorAvailabilityController = (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
};

export const getCategoriesController = (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
};