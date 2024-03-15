import { Request, Response } from "express";
import logger from "../utils/logger";
var request = require("request");

// FACEBOOK
const fb_client_id = process.env.FB_CLIENT_ID;
const fb_redirect_uri =
  (process.env.NGROK_URL ?? "") + (process.env.FB_REDIRECT_URI ?? "");
export function HandleFbOauth(req: Request, res: Response) {
  try {
    const fb_config_id = process.env.FB_CONFIG_ID;
    const extras = '{"setup":{"channel":"IG_API_ONBOARDING"}}';
    const response_type = "code";
    const display = "page";
    const fb = `${process.env.FB_ENDPOINT}/dialog/oauth?client_id=${fb_client_id}&redirect_uri=${fb_redirect_uri}&response_type=${response_type}&config_id=${fb_config_id}&extras=${extras}&display=${display}`;
    return res.redirect(fb);
  } catch (err) {
    logger.error("🚀 ~ HandleFbOauth ~ err", err);
    return res
      .status(500)
      .send({ status: "error", message: "Something went wrong" });
  }
}
export function HandleFbCallback(req: Request, res: Response) {
  const fb_client_secret = process.env.FB_CLIENT_SECRET;
  const query = req.query;
  try {
    request.post(
      `${process.env.FB_GRAPH_ENDPOINT}/oauth/access_token?client_id=${fb_client_id}&redirect_uri=${fb_redirect_uri}&client_secret=${fb_client_secret}&code=${query.code}`,
      { json: { key: "value" } },
      function (error: Error | null, response: Response, body: any) {
        console.log("🚀 ~ HandleFbCallback ~ error:", error);
        if (!body.error) {
          // Save Access Token
          /*  await createCreator();*/
          const payload = {
            platformJWT: body.access_token,
            platform: "instagram",
            user: "test",
          };
          console.log("🚀 ~ HandleFbCallback ~ payload:", payload);
          // Redirect to the app
          res.send(body).status(200);
        } else {
          logger.error("🚀 ~ HandleFbCallback ~ body.error:", body.error);
          res
            .status(500)
            .send({ status: "error", message: "Something went wrong" });
        }
      }
    );
  } catch (err) {
    logger.error("🚀 ~ HandleFbCallback ~ err", err);
    res.status(500).send({ status: "error", message: "Something went wrong" });
  }
}
