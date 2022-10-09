import { Request, Response } from "express";
import { ListExerciseService } from "../../services/Exercise/ListExerciseService";

class ListExerciseController {
  async handle(request: Request, response: Response) {
    const listExerciseService = new ListExerciseService();
    const {fileId} = request.params

    const exercises = await listExerciseService.execute(fileId);

    return response.json(exercises)
  }
}

export {ListExerciseController}