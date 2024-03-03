import Joi from "joi";
import { login } from "../../controllers/auth";
import { loginProps } from "../../controllers/auth/dto";
import { Request, Response } from "../../helpers";
import { wrap } from "../../wrappers";

const loginSchema = {
    reqQuery: Joi.object().length(0),
    reqBody: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        otp: Joi.string(),
    })
}
export const loginApi = async (req: Request<loginProps>, res: Response) => {
    const { email, otp, password } = req.body
    const user = await login({
        email,
        otp,
        password
    })

    console.log("🚀 ~ loginApi ~ user:", user)
    res.send(user)
}

export default wrap(loginApi, {
    authedOnly: false,
    catch: true,
    validate: loginSchema
})