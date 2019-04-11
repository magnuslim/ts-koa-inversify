import "reflect-metadata";
import { Container } from "inversify";
import SpannerUtil, { Credentials } from "./models/utils/spanner";
const container = new Container();

// spanner config
container.bind<Credentials>('spanner_credentials').toConstantValue({
    private_key: 'private_key',
    client_email: 'client_email',
});
container.bind<string>('spanner_project_id').toConstantValue('spanner_project_id');
container.bind<string>('spanner_instance_name').toConstantValue('spanner_instance_name');
container.bind<string>('spanner_database_name').toConstantValue('spanner_database_name');
container.bind<boolean>('spanner_keep_alive').toConstantValue(true);

container.bind<SpannerUtil>(SpannerUtil).to(SpannerUtil).inSingletonScope();

export default container;