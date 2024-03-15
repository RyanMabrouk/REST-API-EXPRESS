import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser({
      ...req.body,
      birthdate: req.body.birthdate ? new Date(req.body.birthdate) : null,
    });
    // await createUserSessionHandler(req, res);
    return res.send({ data: user, status: "success" });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send({ status: "error", message: e.message });
  }
}
