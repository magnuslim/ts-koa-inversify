import Router from 'koa-router';
import { getUser } from './controllers/users/get';

const router = new Router();
router.get('/users/:id', getUser);

export default router;