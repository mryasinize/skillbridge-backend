import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { AUTH_SECRET } from "../../lib/env";
import prisma from "../../lib/prisma";
import { UserSchema } from "./auth.schema";

export const registerService = async (data: z.infer<typeof UserSchema>) => {
    let userId
    const { tutorProfile, ...userData } = data
    userData.password = await bcrypt.hash(userData.password, 10)
    await prisma.$transaction(async tx => {
        const user = await tx.user.create({
            data: userData
        })
        if (tutorProfile) {
            await tx.tutorProfile.create({
                data: {
                    userId: user.id,
                    ...tutorProfile
                }
            })
        }
        userId = user.id
    })

    const token = jwt.sign({ userId: userId }, AUTH_SECRET!, { expiresIn: "7d" })
    return token
};

export const loginService = () => { };

export const changePasswordService = () => { };
