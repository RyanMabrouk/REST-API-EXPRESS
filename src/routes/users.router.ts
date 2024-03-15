import { Router } from "express";

import requireUser from "../middleware/requireUser";
import { getUsersHandler } from "../controller/users.controller";

const router = Router();
router.get("/", requireUser, getUsersHandler);
export default router;
