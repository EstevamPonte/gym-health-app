import { Request, Response } from "express";
import { CreateUserService } from "../../services/Users/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const {name, password} = request.body

    const cretaeUserService = new CreateUserService()

    const user = await cretaeUserService.execute({name, password})

    return response.json(user)
  }
}

export {CreateUserController}