import {Router} from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscription } from '../controller/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({title:'get all subscriptions'}));
subscriptionRouter.get('/:id', (req, res) => res.send({title:'get a subscription by id'}));
subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.put('/:id', (req, res) => res.send({title:'Update a subscription'}));
subscriptionRouter.delete('/:id', (req, res) => res.send({title:'Delete a subscription'}));
subscriptionRouter.get('/user/:id', authorize, getUserSubscription);
subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title:'Cancel a subscription'}));
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title:'get all upcoming renewals'}));


export default subscriptionRouter;
