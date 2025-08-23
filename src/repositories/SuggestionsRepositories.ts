import { EntityRepository, Repository } from "typeorm";
import { Suggestions } from "../entities/Suggestions";

@EntityRepository(Suggestions)
class SuggestionsRepositories extends Repository<Suggestions> {

}

export {SuggestionsRepositories}