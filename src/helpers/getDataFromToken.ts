import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest): string | null => {
    try {
        // Get token from cookies
        const token = request.cookies.get('token')?.value;
        if (!token) throw new Error("No token found");

        // Decode the token
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as { id?: string };

        // Ensure the token contains an id
        if (!decodedToken.id) throw new Error("Token does not contain a valid ID");

        return decodedToken.id; // Return user ID from token
    } catch (error: any) {
        console.error("JWT Verification Error:", error.message);
        return null; // Return null instead of throwing an error
    }
};
