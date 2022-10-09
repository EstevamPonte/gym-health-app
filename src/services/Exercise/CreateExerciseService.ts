import { getCustomRepository } from "typeorm";
import { FileRepositories } from "../../repositories/FileRepositories";
import { ExerciseRepositories } from "../../repositories/ExerciseRepositories";
import { instanceToPlain } from 'class-transformer';

interface IFileRequest {
    name: string,
    fileId: string,
    repetition: string,
    comments: string,
    rest: string,
    weight: number
}

class CreateExerciseService {
    async execute({name, comments, fileId, repetition, rest, weight}: IFileRequest) {
        const fileRepositories = getCustomRepository(FileRepositories);
        const exerciseRepositories = getCustomRepository(ExerciseRepositories);

        const file = await fileRepositories.findOne(fileId);

        if (!file) {
            throw new Error('A ficha não existe')
        }

        const exercise = exerciseRepositories.create({
            name,
            comments,
            repetition,
            rest,
            weight,
            fileReference: file
        })

        await exerciseRepositories.save(exercise)

        return exercise;
    };
}

export {CreateExerciseService}