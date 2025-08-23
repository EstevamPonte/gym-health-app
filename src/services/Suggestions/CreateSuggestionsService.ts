import { getCustomRepository } from "typeorm";
import { SuggestionsRepositories } from "../../repositories/SuggestionsRepositories";
import { instanceToPlain } from 'class-transformer';

interface IFileRequest {
   subject: string
    comments: string
    sugestionType: string
}

class CreateSuggestions {
    async execute({subject, comments, sugestionType}: IFileRequest) {
        const suggestionsRepositories = getCustomRepository(SuggestionsRepositories);

        const file = suggestionsRepositories.create({
            subject: subject,
            comments: comments,
            sugestionType: sugestionType
        });

        await suggestionsRepositories.save(file);

        return instanceToPlain(file)
    };
}

export {CreateSuggestions}