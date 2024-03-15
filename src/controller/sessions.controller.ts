import { Request, Response } from "express";
import { findSessions, updateAllSessions } from "../service/session.service";

export async function deleteAllSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  await updateAllSessions({ user: userId }, { valid: false });
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send({ data: sessions, status: "success" });
}
