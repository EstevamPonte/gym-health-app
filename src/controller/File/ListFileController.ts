import { Request, Response } from "express";
import { ListFileServices } from "../../services/File/ListFileServices";

class ListFileController {
  async handle(request: Request, response: Response) {
    const listFileService = new ListFileServices();

    const file = await listFileService.execute(request.user_id);

    return response.json(file)
  }
}

export {ListFileController}