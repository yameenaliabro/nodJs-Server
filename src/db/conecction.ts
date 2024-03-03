import mongoose from "mongoose";
import { MONGODB_URL } from "../config";
// import {MONGOBD_URL} from "."
mongoose.connect(MONGODB_URL as string).then(() => {
    console.log("🚀 ~ DB connected!")
}).catch(() => {
    console.log("🚀 ~ file: index.ts:8 ~ mongoose.connect ~ DB Notconnected!:")
})