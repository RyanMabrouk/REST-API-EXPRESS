import {
  HandleFbCallback,
  HandleFbOauth,
} from "../controller/oauth.controller";
import requireUser from "../middleware/requireUser";
import { Router } from "express";

const router = Router();
router
  .get("/oauth/facebook", requireUser, HandleFbOauth)
  // if changed here, also change in the app settings in the facebook developer console
  .get("/callback/facebook", HandleFbCallback);

export default router;
