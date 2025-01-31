import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

interface IUser {
    username: string;
    email: string;
    password: string;
}

// Add a new user to the database
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const user: IUser = reqBody;
        console.log(user)
        
        // Validate the user input
        if (!user.username || !user.email || !user.password) {
            return NextResponse.json(
                { message: "Please provide all required fields" },
                { status: 400 }
            );
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Create a new user document
        const newUser = new User({
            username: user.username,
            email: user.email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();
        console.log(newUser);

        return NextResponse.json(
            {
                message: "User created successfully",
                data: newUser,
                success: true,
            },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
