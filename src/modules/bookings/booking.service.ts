import type z from "zod";
import type { BookingSchema, UpdateBookingSchema } from "./booking.schema";
import prisma from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import type { JwtPayload } from "../../types/jwtPayload";

export const createBookingsService = async (data: z.infer<typeof BookingSchema>) => {
    const slot = await prisma.availabilitySlot.findFirst({
        where: {
            tutorProfileId: data.tutorProfileId,
            startTime: data.startTime,
            endTime: data.endTime
        },
        select: {
            id: true,
            isBooked: true
        }
    })
    if (!slot) throw new ApiError(400, "Invalid Time Slot: The selected time slot is no longer available. Please refresh the page and try again.")
    if (slot.isBooked) throw new ApiError(400, "Slot is already booked")

    const existingBooking = await prisma.booking.findFirst({
        where: {
            studentId: data.studentId,
            status: "CONFIRMED",
            startTime: { lt: data.endTime },
            endTime: { gt: data.startTime }
        }
    })
    if (existingBooking) throw new ApiError(400, "Booking Conflict: You already have another session scheduled during this time. Please check your dashboard and pick a different slot.")

    await prisma.$transaction(async tx => {
        await tx.booking.create({
            data: data
        })

        await tx.availabilitySlot.update({
            where: {
                id: slot.id
            },
            data: {
                isBooked: true
            }
        })
    })
};

export const getBookingsService = async () => {
    const bookings = await prisma.booking.findMany({
        where: {
            student: {
                isBanned: false
            },
            tutor: {
                user: {
                    isBanned: false
                }
            }
        },
        include: {
            student: true,
            tutor: {
                include: {
                    user: true,
                    reviews: true
                }
            },
            category: true
        }
    })
    return bookings
};

export const changeBookingStatusService = async (user: JwtPayload, bookingId: string, data: z.infer<typeof UpdateBookingSchema>) => {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
    if (!booking) throw new ApiError(400, "Invalid Booking ID")

    if (user.role === "STUDENT" && data.status !== "CANCELLED") {
        throw new ApiError(401, "Cannot perform this action")
    }

    if (user.role === "TUTOR" && data.status !== "COMPLETED") {
        throw new ApiError(401, "Cannot perform this action")
    }

    if (data.status === "CANCELLED" && booking.status === "COMPLETED") {
        throw new ApiError(400, "Cannot cancel a completed booking")
    }

    if (data.status === "COMPLETED" && booking.status === "CANCELLED") {
        throw new ApiError(400, "Cannot complete a cancelled booking")
    }

    const tutor = await prisma.tutorProfile.findUnique({ where: { userId: user.userId } })

    if (booking.studentId !== user.userId && booking.tutorProfileId !== tutor?.id) {
        throw new ApiError(401, "Cannot perform this action")
    }

    const result = await prisma.booking.update({
        data: data,
        where: {
            id: bookingId
        },
        select: {
            status: true
        }
    })
    return result
};