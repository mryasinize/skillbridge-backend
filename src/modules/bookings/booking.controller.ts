import type { NextFunction, Request, Response } from "express";
import { createBookingsService } from "./booking.service";
import { BookingSchema } from "./booking.schema";

export const createBookingsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = BookingSchema.parse(req.body)
        await createBookingsService(validatedData)
        res.status(201).json({
            success: true,
            message: "Session Booked Successfully"
        })
    } catch (error) {
        next(error)
    }
};

export const getBookingsController = (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
};

export const changeBookingStatusController = (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
};