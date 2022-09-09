import { Request, Response } from 'express'
import { AuthenticateUserService } from '../../services/Users/AuthenticateUserService'

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { name, password } = request.body

    const authenticateUserService = new AuthenticateUserService()
    
    const token = await authenticateUserService.execute({
      name,
      password
    })

    return response.json(token)
  }
}

export {AuthenticateUserController}