import type z from "zod";
import type { ReviewSchema } from "./review.schema";
import prisma from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";

export const createReviewService = async (userId: string, data: z.infer<typeof ReviewSchema>) => {
    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: {
            id: data.tutorProfileId
        }
    })
    if (!tutorProfile) throw new ApiError(400, "Invalid tutor profile id")

    const review = await prisma.review.create({
        data: {
            studentId: userId,
            ...data
        }
    })
    return review
};
