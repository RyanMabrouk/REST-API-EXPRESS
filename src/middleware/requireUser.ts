import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    logger.error("User is not authorized");
    return res
      .status(403)
      .send({ status: "error", message: "You are not authorized" });
  }
  logger.info(`User ${user._id} is authorized`);
  return next();
};

export default requireUser;
