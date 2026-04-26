import { Request, Response } from "express";
import {
  AuthenticateUserService,
  setSessionCookie,
} from "../../services/Users/AuthenticateUserService";
import { CreateSessionService } from "../../services/Session/CreateSessionService";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();
    const createSessionService = new CreateSessionService();

    const token = await authenticateUserService.execute({
      email,
      password,
    });

    setSessionCookie(token.token, response);

    const session = await createSessionService.execute({
      token: token.token,
      user_id: token.user.id,
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };
