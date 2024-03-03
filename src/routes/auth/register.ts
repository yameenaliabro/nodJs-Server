import { register } from "../../controllers/auth";
import { registerProps } from "../../controllers/auth/dto";
import { Request, Response } from "../../helpers";
import { wrap } from "../../wrappers";
import Joi from "joi";


const registerScheme = {
    reqQuery: Joi.object().length(0),
    reqBody: Joi.object({
        otp: Joi.string(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().required(),
        number: Joi.string().required(),
        dob: Joi.string().required(),
        email: Joi.string().required()
    })

}

const registerApi = async (req: Request<registerProps>, res: Response) => {
    const { dob, email, firstName, lastName, number, otp, password } = req.body;
    const user = await register({
        dob, email, firstName, lastName, number, otp, password
    })
    console.log("🚀 ~ registerApi ~ user:", user)
    res.send({ message: "User Register Sucessfully", user: user })
}

export default wrap(registerApi, {
    authedOnly: false,
    catch: true,
    validate: registerScheme
})