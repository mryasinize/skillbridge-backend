import type { NextFunction, Request, Response } from "express";
import { getTutorByIdService, getTutorsService } from "./tutor.service";

export const getTutorsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filters = {
            categoryId: req.query.categoryId as string,
            minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
            maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
            searchTerm: req.query.searchTerm as string,
        }

        const result = await getTutorsService(filters)

        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};

export const getTutorByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tutorProfileId = req.params.id as string
        const result = await getTutorByIdService(tutorProfileId)
        res.json({
            success: true,
            data: result
        })
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