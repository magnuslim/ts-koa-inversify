import {Context} from 'koa';
import UserModel from '../../models/user';

export async function getUser(ctx: Context) {
    const userModel = ctx.container.get(UserModel) as UserModel;
    const user = await userModel.get(ctx.params.id);
    ctx.body = `hello, ${JSON.stringify(user)}!\n`;
}