import { ConnectionOptions, DefaultJobOptions } from "bullmq";

export const redisConnection: ConnectionOptions = {
  host: process.env.REDIS_HOST,
  port: 6379,
};

export const defaultQueueOptions: DefaultJobOptions = {
  removeOnComplete: { count: 20, age: 60 * 60 /* 1 hour */ },
  attempts: 3,
  removeOnFail: false,
  backoff: {
    type: "exponential",
    delay: 3000, // 3 secs
  },
};
