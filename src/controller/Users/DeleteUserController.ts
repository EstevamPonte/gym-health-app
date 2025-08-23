import { Request, Response } from 'express'
import { DeleteUserService } from '../../services/Users/DeleteUserService'

interface IQueryParams {
    username: string,
    password: string
}

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.query

    if (typeof username !== "string" || typeof password !== "string") {
        throw new ReferenceError("Query param 'url' has to be of type string");
    }

    const deleteUserService = new DeleteUserService()
    
    const token = await deleteUserService.execute({
      name: username,
      password
    })

    return response.json(token)
  }
}

export {DeleteUserController}
