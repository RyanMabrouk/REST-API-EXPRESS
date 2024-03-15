import { Router } from "express";
import {
  deleteAllSessionsHandler,
  getUserSessionsHandler,
} from "../controller/sessions.controller";
import requireUser from "../middleware/requireUser";
const router = Router();
router
  .delete("/", requireUser, deleteAllSessionsHandler)
  .get("/", requireUser, getUserSessionsHandler);
export default router;
