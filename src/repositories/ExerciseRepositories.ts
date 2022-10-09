import { EntityRepository, Repository } from "typeorm";
import { Exercise } from "../entities/Exercise";

@EntityRepository(Exercise)
class ExerciseRepositories extends Repository<Exercise> {

}

export {ExerciseRepositories}