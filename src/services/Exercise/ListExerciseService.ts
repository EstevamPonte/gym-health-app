import { getCustomRepository } from "typeorm";
import { ExerciseRepositories } from "../../repositories/ExerciseRepositories";

class ListExerciseService {
    async execute(fileId: string) {
        const exerciseRepositories = getCustomRepository(ExerciseRepositories);
        const exercises = await exerciseRepositories.find({
            where: {
                file_reference: fileId
            },
            order: {
                created_at: "ASC"
            }
        })

        return exercises
    };
}

export {ListExerciseService}