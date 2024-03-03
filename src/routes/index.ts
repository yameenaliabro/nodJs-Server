import express from "express";
import authrouter from "./auth";

const routes = express()
    .use("/auth", authrouter);

export default routes