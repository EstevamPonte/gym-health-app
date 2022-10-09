import { Request, Response } from "express";
import { CreateFileService } from "../../services/File/CreateFileService";

class CreateFileController {
  async handle(request: Request, response: Response) {
    const cretaeFileService = new CreateFileService();
    const {name} = request.body

    const file = await cretaeFileService.execute({name: name, userId: request.user_id});

    return response.json(file)
  }
}

export {CreateFileController}