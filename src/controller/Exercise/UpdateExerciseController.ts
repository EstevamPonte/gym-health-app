import { Request, Response } from "express";
import { UpdateExerciseService } from "../../services/Exercise/UpdateExerciseService";

class UpdateExerciseController {
  async handle(request: Request, response: Response) {
    const updateExerciseService = new UpdateExerciseService();
    const {id, name, repetition, weight, rest, comments, file_reference} = request.body

    const exercise = await updateExerciseService.execute({comments, name, repetition, rest, weight, id, file_reference});

    return response.json(exercise)
  }
}

export {UpdateExerciseController}