import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { getCookie } from "../services/Users/AuthenticateUserService";

interface IPayload {
  sub: string;
}

function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (!request.headers.cookie) {
    return response.status(401).end();
  }

  const cookie = getCookie(request.headers.cookie);
  const token = cookie.session_id;

  try {
    const { sub } = verify(
      token,
      "51dfd5bda8356ced09e100a297586a3d",
    ) as IPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}

export { ensureAuthenticate };
