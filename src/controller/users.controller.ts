import { Request, Response } from "express";
import logger from "../utils/logger";
import { findUsers } from "../service/user.service";

export async function getUsersHandler(req: Request, res: Response) {
  const filters = req.query;
  // page
  const page = Number(filters.page ?? 1);
  delete filters.page;
  // page limit
  const limit = Number(filters.limit ?? 10);
  delete filters.limit;
  try {
    const { data, total, totalPages } = await findUsers({
      query: filters,
      pagination: { page, limit },
    });
    return res.send({
      data: { data, page, total, totalPages },
      status: "success",
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(409).send({ status: "error", message: err.message });
  }
}
