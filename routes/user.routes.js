import {Router} from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send({title:'get all User'});
});
userRouter.get('/:id', (req, res) => {
    res.send({title:'get all details of a user'});
});
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
