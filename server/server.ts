import "reflect-metadata";
import Koa from 'koa';
import { Container } from 'inversify';
import router from './router';
import container from './inversify.config';
import UserModel from './models/user';
import Winston from 'winston';
import SpannerUtil from "./models/utils/spanner";

(async () => {
    await container.get(SpannerUtil).testConnection();

    const app = new Koa();
    app.use(async (ctx: Koa.Context, next: Function) => {
        const logger = Winston.createLogger({
            defaultMeta: {
                request_id: ctx.get('X-Request-Id'),
            }
        });
        const childContainer: Container = container.createChild();
        childContainer.bind<UserModel>(UserModel).to(UserModel).inSingletonScope();
        childContainer.bind<Winston.Logger>('logger').toConstantValue(logger);
        ctx.container = childContainer;
        await next();
    });

    app.use(router.routes()).use(router.allowedMethods());
    app.listen(3000);
    console.log('Server running on port 3000');

})().catch(console.error);

