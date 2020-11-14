import { Router } from '../lib/router/router.js';
import { Login } from '../components/form/login.js';
import { Signin } from '../components/form/signin.js';

const router = new Router('.app')
router.use('/', Login);
router.use('/signin', Signin);
router.start();