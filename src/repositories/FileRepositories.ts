import { EntityRepository, Repository } from "typeorm";
import { File } from "../entities/File";

@EntityRepository(File)
class FileRepositories extends Repository<File> {

}

export {FileRepositories}