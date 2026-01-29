import type { NextFunction, Request, Response } from "express";
import { changeBookingStatusService, createBookingsService, getBookingsService } from "./booking.service";
import { BookingSchema, UpdateBookingSchema } from "./booking.schema";

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

export const getBookingsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getBookingsService()
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
};

export const changeBookingStatusController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookingId = req.params.id as string
        const validatedData = UpdateBookingSchema.parse(req.body)
        const result = await changeBookingStatusService(req.user!, bookingId, validatedData)
        res.json({
            success: true,
            message: "Booking Status Updated Successfully",
            data: {
                status: result
            }
        })
    } catch (error) {
        next(error)
    }
};