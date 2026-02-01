import type z from "zod";
import type { TutorProfile } from "../../generated/prisma/client";
import type { TutorProfileWhereInput } from "../../generated/prisma/models";
import prisma from "../../lib/prisma";
import type { QueryFilter } from "../../types/filters";
import { ApiError } from "../../utils/ApiError";
import type { AvailabilitySchema } from "./tutor.schema";

export const getTutorsService = async (filters: QueryFilter) => {
    const { categoryId, minPrice, maxPrice, searchTerm } = filters

    const where: TutorProfileWhereInput = {
        user: { isBanned: false }
    }

    if (categoryId) {
        where.categoryId = categoryId
    }

    if (minPrice || maxPrice) {
        where.hourlyRate = {
            gte: minPrice || 0,
            lte: maxPrice || 9999999
        }
    }

    if (searchTerm) {
        where.OR = [
            { user: { name: { contains: searchTerm, mode: 'insensitive' } } },
            { user: { email: { contains: searchTerm, mode: 'insensitive' } } },
            { bio: { contains: searchTerm, mode: 'insensitive' } }
        ]
    }

    const tutors = await prisma.tutorProfile.findMany({
        where,
        include: {
            user: true,
            category: true,
            reviews: { select: { rating: true, id: true } },
            availabilitySlots: true
        }
    })
    return tutors
};

export const getTutorByIdService = async (tutorProfileId: string) => {
    const tutor = await prisma.tutorProfile.findUnique({
        where: {
            id: tutorProfileId,
            user: {
                isBanned: false
            }
        },
        include: {
            user: true,
            category: true,
            reviews: true,
            availabilitySlots: true
        }
    })
    if (!tutor) throw new ApiError(404, "Tutor not found")
    return tutor
};

export const updateTutorProfileService = async (userId: string, data: Partial<TutorProfile>) => {
    const profile = await prisma.tutorProfile.update({
        data: data,
        where: { userId: userId }
    })
    return profile
};

export const createAvailabilitySlotService = async (userId: string, data: z.infer<typeof AvailabilitySchema>) => {
    const tutor = await prisma.tutorProfile.findUnique({ where: { userId: userId } })
    if (!tutor) throw new ApiError(400, "Invalid User ID")

    const slot = await prisma.availabilitySlot.findFirst({
        where: {
            tutorProfileId: tutor.id,
            startTime: { lt: data.endTime },
            endTime: { gt: data.startTime }
        }
    })
    if (slot) throw new ApiError(409, "Schedule Conflict: This time slot overlaps with an existing session in your calendar. Please pick a different slot.")

    await prisma.availabilitySlot.create({
        data: {
            tutorProfileId: tutor.id,
            ...data
        }
    })
};

export const deleteAvailabilitySlotService = async (userId: string, slotId: string) => {
    const slot = await prisma.availabilitySlot.findUnique({
        where: { id: slotId },
        include: {
            tutor: { select: { userId: true } }
        }
    })

    if (!slot) throw new ApiError(404, "Slot doesn't exists")
    if (slot.tutor.userId !== userId) throw new ApiError(401, "Cannot perform this action")
    if (slot.isBooked) throw new ApiError(400, "Cannot delete already booked slot")

    await prisma.availabilitySlot.delete({ where: { id: slotId } })
};

export const getCategoriesService = async () => {
    const categories = await prisma.category.findMany()
    return categories
};  