import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../../repositories/UserRepositories';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { instanceToPlain } from 'class-transformer';

interface IAuthenticateRequest {
  name: string,
  password: string
}

class AuthenticateUserService {
  async execute({name, password}: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UserRepositories)

    const user = await userRepositories.findOne({
      name,
    }, {relations: ["codeReference"]})
    if(!user) {
      throw new Error("Email/Senha está incorreto")
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new Error('Email/Senha está incorreto')
    }

    const token = sign({
      name: user.name,
    }, '51dfd5bda8356ced09e100a297586a3d', {
      subject: String(user.id),
      expiresIn: '1d'
    })

    let userResponse = instanceToPlain(user);

    return {...userResponse, token}
  }
}

export {AuthenticateUserService}