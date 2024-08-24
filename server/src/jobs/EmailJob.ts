import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import sendMail from "../services/Mail.js";

interface EmailJobDataType {
  to: string;
  subject: string;
  templateName: string;
}

export const emailQueueName = "emailQueue";

export const emailQueue = new Queue(emailQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueOptions,
});

// Workers
export const queueWorker = new Worker(
  emailQueueName,
  async (job: Job) => {
    const data: EmailJobDataType = job.data;

    await sendMail(data.to, data.subject, data.templateName);
  },
  { connection: redisConnection }
);
