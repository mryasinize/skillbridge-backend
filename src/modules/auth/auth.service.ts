import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { AUTH_SECRET } from "../../lib/env";
import prisma from "../../lib/prisma";
import { LoginSchema, UserSchema } from "./auth.schema";
import { ApiError } from "../../utils/ApiError";

export const registerService = async (data: z.infer<typeof UserSchema>) => {
    let token, userObj
    const { tutorProfile, ...userData } = data
    userData.password = await bcrypt.hash(userData.password, 10)
    await prisma.$transaction(async tx => {
        const user = await tx.user.create({
            data: userData
        })
        if (userData.role === "TUTOR" && tutorProfile) {
            await tx.tutorProfile.create({
                data: {
                    userId: user.id,
                    ...tutorProfile
                }
            })
        }
        token = jwt.sign({ userId: user.id, role: user.role }, AUTH_SECRET!, { expiresIn: "7d" })
        userObj = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            tutorProfile
        }
    })

    return {
        token,
        user: userObj
    }
};

export const loginService = async (data: z.infer<typeof LoginSchema>) => {
    const { email, password } = data

    const user = await prisma.user.findUnique({
        where: { email: email }
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

    const token = jwt.sign({ userId: user.id, role: user.role }, AUTH_SECRET!, { expiresIn: '7d' })
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

export const changePasswordService = () => { };
