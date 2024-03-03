import mongoose, { Schema } from "mongoose";
import { IUserProps } from "../types/user";

const userSchema = new Schema<IUserProps>({
    dob: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    number: {
        type: String, required: true, validate: {
            validator: (value: string) => {
                return /^[0-9]{11}$/.test(value);
            },
            message: "Number must be 11 Character"
        }
    },
    otp: { type: String, required: true },
    password: {
        type: String, required: true, validate: {
            validator: (value: string) => {
                return value.length >= 4
            },
            message: "Password must be 8 character"
        }
    }
})

const IUser = mongoose.model("user", userSchema);

export default IUser;