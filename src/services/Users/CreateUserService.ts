import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../../repositories/UserRepositories";
import { hash } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2).max(100),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(100),
  email: z.email("Email invalido"),
});

interface IUserRequest {
  name: string;
  password: string;
  email: string;
}

class CreateUserService {
  async execute({ name, password, email }: IUserRequest) {
    const usersRepository = getCustomRepository(UserRepositories);

    const result = userSchema.safeParse({ name, password, email });

    if (!password) {
      throw new Error("Senha precisa ser informada");
    }

    if (!result.success) {
      const formattedErrors = z.flattenError(result.error);
      throw new Error(JSON.stringify(formattedErrors));
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error("Já existe um usuário com esse nome");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      password: passwordHash,
      email,
    });

    await usersRepository.save(user);

    return instanceToPlain(user);
  }
}

export { CreateUserService };
