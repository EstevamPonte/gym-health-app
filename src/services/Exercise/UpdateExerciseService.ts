import { getCustomRepository } from "typeorm";
import { FileRepositories } from "../../repositories/FileRepositories";
import { ExerciseRepositories } from "../../repositories/ExerciseRepositories";
import { instanceToPlain } from 'class-transformer';
import {File} from "../../entities/File"

interface IFileRequest {
    id: string,
    name: string,
    repetition: string,
    comments: string,
    rest: string,
    weight: number,
    file_reference: string,
}

class UpdateExerciseService {
    async execute(fullExercise: IFileRequest) {
        const exerciseRepositories = getCustomRepository(ExerciseRepositories);

        const exercise = await exerciseRepositories.save(fullExercise)

        if (!exercise) {
            throw new Error('A ficha não existe')
        }


        return exercise;
    };
}

export {UpdateExerciseService}