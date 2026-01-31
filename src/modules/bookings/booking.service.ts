import type z from "zod";
import type { BookingSchema, UpdateBookingSchema } from "./booking.schema";
import prisma from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import type { JwtPayload } from "../../types/jwtPayload";

export const createBookingsService = async (data: z.infer<typeof BookingSchema>) => {
    await prisma.booking.create({
        data: data
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

    const tutor = await prisma.tutorProfile.findUnique({ where: { userId: user.userId } })
    if (!tutor) throw new ApiError(400, "Invalid User ID")

    if (booking.studentId !== user.userId && booking.tutorProfileId !== tutor.id) {
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