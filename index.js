import * as dotenv from 'dotenv';
import initApp from "./Src/initApp.js";
dotenv.config();
import express from 'express';
const app = express()
const PORT = process.env.PORT || 3000
initApp (app, express);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));