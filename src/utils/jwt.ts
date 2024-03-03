import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config"

export const generateToken = async (password: string) => {
    return jwt.sign({ password }, SECRET_KEY as string, {
        expiresIn: "2h",
    })
}