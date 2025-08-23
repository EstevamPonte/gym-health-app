import { getCustomRepository } from "typeorm";
import { SuggestionsRepositories } from "../../repositories/SuggestionsRepositories";

class ListSuggestionsServices {
    async execute() {
        const suggestionsRepositorie = getCustomRepository(SuggestionsRepositories);
        const files = await suggestionsRepositorie.find()

        return files
    };
}

export {ListSuggestionsServices}