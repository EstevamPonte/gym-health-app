import { getCustomRepository } from "typeorm";
import { FileRepositories } from "../../repositories/FileRepositories";

class DeleteFileService {
    async execute(fileId: string) {
        const fileRepositorie = getCustomRepository(FileRepositories);
        const fileExists = await fileRepositorie.findOne(fileId);
        
        if (!fileExists) {
            throw new Error('A ficha não existe')
        }
        
        await fileRepositorie.delete(fileId);

        return {deletedID: fileId}
    };
}

export {DeleteFileService}