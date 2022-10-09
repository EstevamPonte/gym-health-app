import { EntityRepository, Repository } from "typeorm";
import { Code } from "../entities/Code";

@EntityRepository(Code)
class CodeRepositories extends Repository<Code> {

}

export {CodeRepositories}