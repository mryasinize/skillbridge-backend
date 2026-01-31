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

export const deleteReviewService = async (userId: string, reviewId: string) => {
    const review = await prisma.review.findUnique({
        where: {
            id: reviewId
        }
    })

    if (!review) throw new ApiError(404, "Review not found")
    if (review.studentId !== userId) throw new ApiError(403, "You are not authorized to delete this review")

    await prisma.review.delete({
        where: {
            id: reviewId
        }
    })
    return review
};
