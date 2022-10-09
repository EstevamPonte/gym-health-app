import { Request, Response } from "express";
import { DeleteExerciseService } from "../../services/Exercise/DeleteExerciseService";

class DeleteExerciseController {
  async handle(request: Request, response: Response) {
      console.log("oiii")
    const deleteExerciseService = new DeleteExerciseService();
    const {fileId} = request.params

    const exercises = await deleteExerciseService.execute(fileId);

    return response.json(exercises)
  }
}

export {DeleteExerciseController}