import { Request, Response } from 'express'
import { AuthenticateUserWithCodeService } from '../../services/Code/AuthenticateUserWithCodeService'

class AuthenticateUserWithCodeController {
  async handle(request: Request, response: Response) {
    const { code } = request.body

    const authenticateUserWithCodeService = new AuthenticateUserWithCodeService()
    
    const token = await authenticateUserWithCodeService.execute(code)

    return response.json(token)
  }
}

export {AuthenticateUserWithCodeController}