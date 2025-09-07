import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest): string => {
    try {
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            throw new Error("Missing token");
        }
        if (!process.env.TOKEN_SECRET) {
            throw new Error("Missing TOKEN_SECRET");
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as jwt.JwtPayload | string;
        if (typeof decoded === "string") {
            throw new Error("Malformed token payload");
        }
        const userId = decoded.id as string | undefined;
        if (!userId) {
            throw new Error("Token missing user id");
        }
        return userId;
    } catch {
        throw new Error("Invalid token");
    }
}