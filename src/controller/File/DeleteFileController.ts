import { Request, Response } from "express";
import { DeleteFileService } from "../../services/File/DeleteFileService";

class DeleteFileController {
  async handle(request: Request, response: Response) {
    const deleteFileService = new DeleteFileService();
    const {fileID} = request.params

    const file = await deleteFileService.execute(fileID);

    return response.json(file)
  }
}

export {DeleteFileController}