import z from "zod";

export const BookingSchema = z.object({
    studentId: z.uuid(),
    tutorProfileId: z.uuid(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date()
}).refine(data => data.startTime < data.endTime, {
    error: "startTime must be before endTime"
})