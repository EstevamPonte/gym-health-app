import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../../repositories/UserRepositories';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { instanceToPlain } from 'class-transformer';

interface IDeleteUser {
  name: string,
  password: string
}

class DeleteUserService {
  async execute({name, password}: IDeleteUser) {
    const userRepositories = getCustomRepository(UserRepositories)

    const user = await userRepositories.findOne({
      name,
    }, {relations: ["codeReference"]})
    if(!user) {
      throw new Error("Email/Senha está incorreto")
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new Error('Senha está incorreto')
    }

    await userRepositories.delete({
        name
    })

    return {success: true, message: "Usuário deletado com sucesso"}
  }
}

export {DeleteUserService}