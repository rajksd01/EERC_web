import express from "express";
const router = express.Router();
import {isLoggedIn} from "../controller/auth.js"
import { insertMessages,getMessages } from "../controller/contact.js";

router.post("/", insertMessages);

router.get("/allmessages",isLoggedIn,getMessages)

export default router;
