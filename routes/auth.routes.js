import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signup', (req, res) => {
    res.send('Sign up');
});

authRouter.post('/signin', (req, res) => {
    res.send('Sign in');
});

authRouter.post('/signout', (req, res) => {
    res.send('Sign out');
});

export default authRouter;
