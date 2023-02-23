import { Request, Response } from "express";
import { CreateCodeService } from "../../services/Code/CreateCodeService";

class CreateCodeController {
  async handle(request: Request, response: Response) {
    const cretaeCodeService = new CreateCodeService();

    const user = await cretaeCodeService.execute(request.user_id);

    return response.json(user)
  }
}

export {CreateCodeController}