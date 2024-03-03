import express from "express";
import register from "./register";
import { loginApi } from "./login";

const authrouter = express()
    .use("/login", loginApi)
    .use("/register", register)

export default authrouter