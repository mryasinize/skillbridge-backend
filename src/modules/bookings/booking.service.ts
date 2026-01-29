import type z from "zod";
import type { BookingSchema } from "./booking.schema";
import prisma from "../../lib/prisma";

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
                    user: true
                }
            },
        }
    })
    return bookings
};

export const changeBookingStatusService = () => { };