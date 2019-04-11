import Spanner from './utils/spanner';
import { Logger } from 'winston';
import { first } from "lodash";
import { injectable, inject } from 'inversify';

export interface User {
    id: string;
}

@injectable()
export default class UserModel {
    private spanner: Spanner;
    private logger: Logger;

    constructor(
        @inject(Spanner) spanner: Spanner,
        @inject('logger') logger: Logger) {
        this.spanner = spanner;
        this.logger = logger;
    }

    async get(id: string): Promise<User | null> {
        this.logger.debug(`getting user: ${id}`);
        const rows = await this.spanner.run({
            sql: `SELECT '${id}' as id`,
        })
        return first(rows) as User || null;
    }
}