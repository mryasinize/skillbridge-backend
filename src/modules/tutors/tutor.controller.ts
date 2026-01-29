import type { NextFunction, Request, Response } from "express";
import { getTutorByIdService, getTutorsService, createAvailabilitySlotService, deleteAvailabilitySlotService, updateTutorProfileService, getCategoriesService } from "./tutor.service";
import { AvailabilitySchema, UpdateTutorProfileSchema } from "./tutor.schema";
import type { TutorProfile } from "../../generated/prisma/client";

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

export const updateTutorProfileController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = UpdateTutorProfileSchema.parse(req.body)
        const result = await updateTutorProfileService(req.user!.userId, validatedData as TutorProfile)
        res.json({
            success: true,
            message: "Profile updated successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
};

export const createAvailabilitySlotController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = AvailabilitySchema.parse(req.body)
        await createAvailabilitySlotService(req.user!.userId, validatedData)
        res.status(201).json({
            success: true,
            message: "Availability Slot Added"
        })
    } catch (error) {
        next(error)
    }
};

export const deleteAvailabilitySlotController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const slotId = req.params.id as string
        await deleteAvailabilitySlotService(req.user!.userId, slotId)
        res.json({
            success: false,
            message: "Slot deleted successfully"
        })
    } catch (error) {
        next(error)
    }
};

export const getCategoriesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getCategoriesService()
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};