import { ApiError } from "../../helpers";
import IUser from "../../model/user";
import bcrypt from "bcrypt";
import { loginProps, registerProps } from "./dto";
import { generateToken } from "../../utils/jwt";

export const register = async (registerprops: registerProps) => {
    const { dob, email, firstName, lastName, number, password, otp } = registerprops
    try {
        const existinUser = await IUser.findOne({ email });
        if (existinUser) {
            throw new ApiError(401, 'User Already Exist');
        }
        // password will be hashed 
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new IUser({
            dob,
            email,
            firstName,
            lastName,
            number,
            password: hashedPassword,
            otp
        })
        const user = newUser.save();

        if (!user) {
            throw new ApiError(401, "User Register Failed");
        }
        return user
    } catch (error) {
        throw new ApiError(500, "Server Interval Error")
    }
}

export const login = async (loginprops: loginProps) => {
    const { email, otp, password } = loginprops;
    try {
        const user = await IUser.findOne({ email })

        if (!user) {
            throw new ApiError(401, "User does Not Found")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new ApiError(401, "Password Does not Valid")
        }

        const token = await generateToken(user.password)

        return { token, user }
    } catch (error) {
        throw new ApiError(500, "Server Interval Error")
    }
}