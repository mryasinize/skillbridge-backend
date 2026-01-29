import type { User } from "../../generated/prisma/client";
import prisma from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";

export const getUserProfileService = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { tutorProfile: true }
    })

    if (!user) throw new ApiError(400, "User not found")
    if (user.id !== userId) throw new ApiError(401, "Cannot perform this action")

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tutorProfile: user.tutorProfile
    }
};

export const updateUserProfileService = async (userId: string, data: Partial<User>) => {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new ApiError(400, "User not found")
    if (user.id !== userId) throw new ApiError(401, "Cannot perform this action")

    const result = await prisma.user.update({
        data: {
            ...data
        },
        where: {
            id: userId
        },
        include: { tutorProfile: true }
    })
    return {
        id: result.id,
        name: result.name,
        email: result.email,
        role: result.role,
        tutorProfile: result.tutorProfile
    }
};