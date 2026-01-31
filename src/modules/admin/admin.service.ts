import { Role } from "../../generated/prisma/enums";
import prisma from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";

export const analyticsService = async () => {
    const [studentCount, tutorCount, bookingCount] = await Promise.all([
        prisma.user.count({ where: { role: Role.STUDENT } }),
        prisma.user.count({ where: { role: Role.TUTOR } }),
        prisma.booking.count()
    ])
    return {
        totalStudents: studentCount,
        totalTutors: tutorCount,
        totalBookings: bookingCount
    }
};

export const getUsersService = async (userId: string) => {
    const users = await prisma.user.findMany({
        where: {
            NOT: {
                id: userId
            }
        },
        include: {
            tutorProfile: {
                include: {
                    category: true,
                    reviews: { select: { rating: true } },
                }
            },
        },
        omit: {
            isBanned: false
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return users
};

export const moderateUserService = async (userId: string, action: "BAN" | "UNBAN") => {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new ApiError(400, "User not found")
    await prisma.user.update({
        data: {
            isBanned: action === "BAN",
        },
        where: {
            id: userId
        }
    })
};

export const createCategoryService = async (name: string) => {
    const category = await prisma.category.create({
        data: {
            name
        }
    })
    return category
};

export const updateCategoryService = async (id: string, name: string) => {
    const category = await prisma.category.update({
        data: {
            name
        },
        where: {
            id
        }
    })
    return category
};

export const deleteCategoryService = async (id: string) => {
    const category = await prisma.category.delete({
        where: {
            id
        }
    })
    return category
};