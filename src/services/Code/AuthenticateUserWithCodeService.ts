import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../../repositories/UserRepositories';
import { CodeRepositories } from '../../repositories/CodeRepositories';
import { sign } from 'jsonwebtoken';
import { instanceToPlain } from 'class-transformer';



class AuthenticateUserWithCodeService {
  async execute(codeNumber: number) {
    const userRepositories = getCustomRepository(UserRepositories);
    const codeRepositories = getCustomRepository(CodeRepositories);

    const code = await codeRepositories.findOne({
      where: {
        codeNumber: codeNumber
      }
    })

    const user = await userRepositories.findOne({
      where: {
        codeReference: code
      },
      relations: ["codeReference"]
    })

    if(!user) {
      throw new Error("Não existe um usuário com esse código");
    }

    const codeMatch = user.codeReference.codeNumber === codeNumber;

    if (!codeMatch) {
      throw new Error("Não existe um usuário com esse código");
    }
 
    const token = sign({
      name: user.name,
      code: true
    }, '51dfd5bda8356ced09e100a297586a3d', {
      subject: String(user.id),
      expiresIn: '1d'
    })

    let userResponse = instanceToPlain(user);

    return {...userResponse, token, code: true}
  }
}

export {AuthenticateUserWithCodeService}