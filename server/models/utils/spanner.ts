import { Spanner, Database, Transaction, Instance } from '@google-cloud/spanner';
import { injectable, inject } from 'inversify';
import { RunPromise } from '@google-cloud/spanner/build/src/transaction';

export interface Credentials {
    private_key: string;
    client_email: string;
};

export interface Query {
    sql: string;
    params?: {};
}

@injectable()
export default class SpannerUtil {
    private spanner: Spanner;
    private database: Database;

    constructor(
        @inject('spanner_credentials') credentials: Credentials,
        @inject('spanner_project_id') projectId: string,
        @inject('spanner_instance_name') instanceName: string,
        @inject('spanner_database_name') databaseName: string,
        @inject('spanner_keep_alive') keepAlive?: boolean,
    ) {
        this.spanner = new Spanner({
            projectId,
            credentials
        });

        this.database = (this.spanner.instance(instanceName) as Instance).database(databaseName, {keepAlive});
    }

    async testConnection(): Promise<void> {
        await this.database.run({
            sql: 'SELECT 1 AS OK',
        }, undefined, undefined);
    };

    /**
     * Execute sql query
     */
    async run(query: Query, transaction?: Transaction): Promise<{}[]> {
        const newQuery = query;
        const [rows] = transaction ? await transaction.run(newQuery) : await (this.database.run(newQuery, undefined, undefined) as unknown as RunPromise);
        return rows ? rows.map(row => row.toJSON()) : [];
    };
};
