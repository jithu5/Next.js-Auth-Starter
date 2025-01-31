import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


connect()

interface IUser {
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const user: IUser = reqBody;
        console.log(user)

        const existingUser = await User.findOne({ email: user.email });
        console.log(existingUser)
        if (!existingUser) {
            return NextResponse.json({
                message: "User not found",
                status: 401
            })
        }

        const isPasswordMatch = await bcryptjs.compare(user.password, existingUser.password);
        if (!isPasswordMatch) {
            return NextResponse.json({
                message: "Invalid password",
                status: 401
            })
        }


        const token: string = await jwt.sign({ id: existingUser._id }, process.env.TOKEN_SECRET! as string, { expiresIn: "2d" });  // Generate JWT with 2-day expiry)

        const response = NextResponse.json({
            message: "Logged in successfully",
            status: 200,
            data: existingUser,
            success: true
        })

        // ✅ Set cookie using Next.js `cookies()` API
        response.cookies.set("token", token, {
            maxAge: 60 * 60 * 24 * 2, // 2 days
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return response;

    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: error.status }
        );
    }
}