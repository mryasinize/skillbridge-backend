import prisma from "../../lib/prisma";

export const getTutorsService = async () => {
    const tutors = await prisma.tutorProfile.findMany({
        include: {
            user: true,
            category: true,
            reviews: true,
            availabilitySlots: true
        }
    })
    return tutors
};

export const getTutorByIdService = () => { };

export const updateTutorProfileService = () => { };

export const updateTutorAvailabilityService = () => { };

export const deleteTutorAvailabilityService = () => { };

export const getCategoriesService = () => { };