import { Router } from "express";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "../controller/session.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/session.schema";

const router = Router();
router
  .get("/", requireUser, getUserSessionHandler)
  .post("/", validateResource(createSessionSchema), createUserSessionHandler)
  .delete("/", requireUser, deleteSessionHandler);

export default router;
