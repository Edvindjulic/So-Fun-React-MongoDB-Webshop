// GET /api/users A L
// POST /api/users/signup V
// POST /api/users/login V
// POST /api/users/logout L
// PUT /api/users/assignAsAdmin A

import express from 'express';
import { authAdmin, authLogin } from '../middlewares';
import {
  assignAsAdmin,
  checkSession, logInUser,
  logOutUser,
  removeAsAdmin,
  signUpUser
} from './user-controller';

const userRouter = express
  .Router()
  .post('/api/users/signup', signUpUser)
  .post('/api/users/login', logInUser)
  .get('/api/users/checkSession', checkSession)
  .post('/api/users/logout', authLogin, logOutUser)
  .put('/api/users/:id/assignAsAdmin', authAdmin, assignAsAdmin)
  .put('/api/users/:id/removeAsAdmin', authAdmin, removeAsAdmin);

export default userRouter;
