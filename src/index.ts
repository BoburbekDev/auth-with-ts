import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import PostContoller from '@/resources/post/post.controller';
import UserContoller from './resources/user/user.controller';

validateEnv();

const app = new App([new PostContoller(), new UserContoller()], Number(process.env.PORT));

app.listen()