import { Client as WorkflowClient } from "@upstash/workflow";
import { QSTASH_TOKEN, QSTASH_URL } from "./env";

export const workflowClient = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
});