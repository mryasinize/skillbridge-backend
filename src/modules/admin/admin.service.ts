import type { Request, Response, NextFunction } from "express";
import prisma from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import { Role } from "../../generated/prisma/enums";

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