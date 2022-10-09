import { getCustomRepository } from "typeorm";
import { FileRepositories } from "../../repositories/FileRepositories";
import { UserRepositories } from "../../repositories/UserRepositories";
import { instanceToPlain } from 'class-transformer';

interface IFileRequest {
    name: string,
    userId: string
}

class CreateFileService {
    async execute({name, userId}: IFileRequest) {
        const fileRepositorie = getCustomRepository(FileRepositories);
        const userRepositories = getCustomRepository(UserRepositories);
        
        const user = await userRepositories.findOne(userId);

        const file = fileRepositorie.create({
            name: name,
            userReference: user
        });

        await fileRepositorie.save(file);

        return instanceToPlain(file)
    };
}

export {CreateFileService}