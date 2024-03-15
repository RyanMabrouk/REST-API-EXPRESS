import { Express, Request, Response } from "express";
import sessionRouter from "./routes/session.router";
import OfferRouter from "./routes/offer.router";
import userRouter from "./routes/user.router";
import oauthRouter from "./routes/oauth.router";
import sessionsRouter from "./routes/sessions.router";
import usersRouter from "./routes/users.router";
import notifcationsRouter from "./routes/notifications.router";
function routes(app: Express) {
  // Auth Users
  app.use("/api/user", userRouter);
  app.use("/api/users", usersRouter);
  // Auth Sessions
  app.use("/api/session", sessionRouter);
  app.use("/api/sessions", sessionsRouter);
  // Offers
  app.use("/api/offers", OfferRouter);
  // Notifications
  app.use("/api/notifications", notifcationsRouter);
  // OAUTH
  app.use("/api", oauthRouter);

  app.get("/healthcheck", (req: Request, res: Response) => {
    res.send({ message: "I am alive" }).status(200);
  });
}
export default routes;
