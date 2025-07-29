import { Router } from "express";
import { sendReminders } from "../controller/workflow.contrller";

const workflowRouter = Router();

workflowRouter.post("/", sendReminders);

export default workflowRouter;