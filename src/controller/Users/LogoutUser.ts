import { Request, Response } from "express";
import { clearSessionCookie } from "../../services/Users/AuthenticateUserService";

class LogoutUser {
  async handle(request: Request, response: Response) {
    clearSessionCookie(response);

    return response.json({ message: "Deslogou" });
  }
}

export { LogoutUser };
