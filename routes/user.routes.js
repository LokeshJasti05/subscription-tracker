import {Router} from 'express';
import { getUsers, getUser } from '../controller/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';
const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id',authorize, getUser);

userRouter.post('/:id', (req, res) => {
    res.send({title:'Create a new user'});
});
userRouter.put('/:id', (req, res) => {
    res.send({title:'Update a user'});
});
userRouter.delete('/:id', (req, res) => {
    res.send({title:'Delete a user'});
});

export default userRouter;
 // 1:53:05