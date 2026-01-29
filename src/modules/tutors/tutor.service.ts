import type { TutorProfileWhereInput } from "../../generated/prisma/models";
import prisma from "../../lib/prisma";
import type { QueryFilter } from "../../types/filters";
import { ApiError } from "../../utils/ApiError";

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
            reviews: true,
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
    if (tutor) throw new ApiError(404, "Tutor not found")
    return tutor
};

export const updateTutorProfileService = () => { };

export const updateTutorAvailabilityService = () => { };

export const deleteTutorAvailabilityService = () => { };

export const getCategoriesService = () => { };