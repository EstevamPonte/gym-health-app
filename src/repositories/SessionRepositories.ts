import { EntityRepository, Repository } from "typeorm";
import { Session } from "../entities/Session";

@EntityRepository(Session)
class SessionRepositories extends Repository<Session> {}

export { SessionRepositories };
