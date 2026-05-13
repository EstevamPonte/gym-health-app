import { Request, Response, NextFunction } from "express";

interface IPayload {
  sub: string;
}

function ensureDevelopmentEnv(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (process.env.NODE_ENV !== "development") {
    return response.status(403).json({
      message: "Migrations can only be run in development environment",
    });
  }
  return next();
}

export { ensureDevelopmentEnv };
