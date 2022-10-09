import { getCustomRepository } from "typeorm";
import { FileRepositories } from "../../repositories/FileRepositories";

class ListFileServices {
    async execute(userId: string) {
        const fileRepositorie = getCustomRepository(FileRepositories);
        const files = await fileRepositorie.find({
            where: {
                user_reference: userId
            }
        })

        return files
    };
}

export {ListFileServices}