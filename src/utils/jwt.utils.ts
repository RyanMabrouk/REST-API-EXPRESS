import jwt from "jsonwebtoken";
import config from "config";
import logger from "./logger";

export function signJwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");
  const JWT = jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
  return JWT;
}

export function verifyJwt(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) {
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    logger.error(err.message);
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
}
