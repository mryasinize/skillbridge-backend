import prisma from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";

export const getTutorsService = async () => {
    const tutors = await prisma.tutorProfile.findMany({
        where: {
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