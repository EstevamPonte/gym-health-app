import { SessionRepositories } from "../../repositories/SessionRepositories";
import { hash } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { User } from "../../entities/User";
import { UserRepositories } from "../../repositories/UserRepositories";
import { getCustomRepository } from "typeorm";

interface ISession {
  token: string;
  user_id: string;
}

const EXPIRATIONS_IN_MILLISECONDS = 60 * 60 * 24 * 30 * 1000; // 30 Days

class CreateSessionService {
  async execute({ token, user_id }: ISession) {
    const sessionRepositories = getCustomRepository(SessionRepositories);
    const userRepositories = getCustomRepository(UserRepositories);

    const sessionAlreadyExists = await sessionRepositories.findOne({
      token,
    });

    if (sessionAlreadyExists) {
      throw new Error("Já existe uma session com esse usuário");
    }

    const user = await userRepositories.findOne({
      id: user_id,
    });

    if (!user) {
      throw new Error("Usuário não existe");
    }

    const expiresAt = new Date(Date.now() + EXPIRATIONS_IN_MILLISECONDS);

    const session = sessionRepositories.create({
      token: token,
      userReference: user,
      expires_at: expiresAt,
    });

    const sessionCreated = await sessionRepositories.save(session);

    return instanceToPlain(sessionCreated);
  }
}

export { CreateSessionService };
