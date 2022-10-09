import { getCustomRepository } from "typeorm";
import { CodeRepositories } from "../../repositories/CodeRepositories";
import { UserRepositories } from "../../repositories/UserRepositories";
import { instanceToPlain } from 'class-transformer';
import { Random } from "random-js"

class CreateCodeService {
  async execute(user_id: string) {
    const codeRepository = getCustomRepository(CodeRepositories);

    const usersRepository = getCustomRepository(UserRepositories);
    const user = await usersRepository.findOne(user_id);

    const random = new Random();
    const value = random.integer(9999999, 99999999);

    const code = codeRepository.create({codeNumber: value});
    await codeRepository.save(code);

    user.codeReference = code;
    usersRepository.save(user);
    
    return value
  }
}

export {CreateCodeService}