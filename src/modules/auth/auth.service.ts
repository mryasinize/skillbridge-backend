import bcrypt from "bcrypt";
import { z } from "zod";
import prisma from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import { signToken } from "../../utils/jwt";
import { LoginSchema, PasswordChangeSchema, UserSchema } from "./auth.schema";

export const registerService = async (data: z.infer<typeof UserSchema>) => {
    const { tutorProfile, ...userData } = data

    const existingUser = await prisma.user.findUnique({ where: { email: userData.email } })
    if (existingUser) throw new ApiError(400, "Email already registered")

    if (userData.role === "TUTOR" && !tutorProfile) {
        throw new ApiError(400, "Tutor profile data is required for tutor registration")
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    userData.password = hashedPassword

    const result = await prisma.$transaction(async tx => {
        let tutor
        const user = await tx.user.create({
            data: userData,
            include: {
                tutorProfile: userData.role === "TUTOR"
            }
        })

        if (userData.role === "TUTOR" && tutorProfile) {
            tutor = await tx.tutorProfile.create({
                data: {
                    userId: user.id,
                    ...tutorProfile
                }
            })
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            tutorProfile: tutor
        }
    })

    const token = signToken({ userId: result.id, role: result.role })

    return {
        token,
        user: result
    }
};

export const loginService = async (data: z.infer<typeof LoginSchema>) => {
    const { email, password } = data

    const user = await prisma.user.findUnique({
        where: { email: email },
        omit: {
            password: false,
            isBanned: false
        }
    })

    if (!user) {
        throw new ApiError(401, "Invalid email or password")
    }

    if (user.isBanned) {
        throw new ApiError(403, "Your account has been banned. Please contact admin")
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid email or password")
    }

    const token = signToken({ userId: user.id, role: user.role })
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }
};

export const changePasswordService = async (userId: string, data: z.infer<typeof PasswordChangeSchema>) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        omit: {
            password: false,
            isBanned: false
        }
    })
    if (!user) throw new ApiError(400, "User doesn't exist")

    const isPasswordMatch = await bcrypt.compare(data.oldPassword, user.password)
    if (!isPasswordMatch) throw new ApiError(401, "Incorrect password")

    const newHashedPassword = await bcrypt.hash(data.newPassword, 10)

    await prisma.user.update({
        data: {
            password: newHashedPassword
        },
        where: {
            id: userId
        }
    })
};
