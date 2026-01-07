const { emailQueue } =  require("./emailQueue.js");

async function sendEmail(data) {
  await emailQueue.add("send-email", data);
}

module.exports = {sendEmail}