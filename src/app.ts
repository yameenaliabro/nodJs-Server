import bodyParser from "body-parser";
import express from "express";
import { PORT } from "./config";
import "./db/conecction"
import routes from "./routes";

const app = express();

app.use(bodyParser.json())
    .use("/", routes)

app.listen(PORT, () => {
    console.log("Serer Listeninig", PORT)
})