import prisma from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";

export const getUserProfileService = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { tutorProfile: true },
        omit: {
            password: true,
            isBanned: true
        }
    })

    if (!user) throw new ApiError(400, "User not found")
    if (user.id !== userId) throw new ApiError(401, "Cannot perform this action")

    return user
};

export const updateUserProfileService = () => { };