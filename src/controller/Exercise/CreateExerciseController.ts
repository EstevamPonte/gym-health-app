import { Request, Response } from "express";
import { CreateExerciseService } from "../../services/Exercise/CreateExerciseService";

class CreateExerciseController {
  async handle(request: Request, response: Response) {
    const createExerciseService = new CreateExerciseService();
    const {name, repetition, weight, rest, comments, fileId} = request.body

    const exercise = await createExerciseService.execute({comments, fileId, name, repetition, rest, weight});

    return response.json(exercise)
  }
}

export {CreateExerciseController}