const { Queue } = require("bullmq");
const { connection } = require("./redis.js");

const emailQueue = new Queue("email-queue", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000
    },
    removeOnComplete: true
  }
});


module.exports = { emailQueue };