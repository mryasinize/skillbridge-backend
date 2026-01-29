import type z from "zod";
import type { BookingSchema } from "./booking.schema";
import prisma from "../../lib/prisma";

export const createBookingsService = async (data: z.infer<typeof BookingSchema>) => {
    await prisma.booking.create({
        data: data
    })
};

export const getBookingsService = () => { };

export const changeBookingStatusService = () => { };