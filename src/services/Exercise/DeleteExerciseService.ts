import { getCustomRepository } from "typeorm";
import { ExerciseRepositories } from "../../repositories/ExerciseRepositories";

class DeleteExerciseService {
    async execute(fileId: string) {
        const exerciseRepositories = getCustomRepository(ExerciseRepositories);
        const exercises = await exerciseRepositories.findOne(fileId)

        if (!exercises) {
            throw new Error('O exercicio não existe')
        }

        await exerciseRepositories.delete(fileId);

        return {deletedID: fileId}
    };
}

export {DeleteExerciseService}