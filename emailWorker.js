const { Worker } = require("bullmq");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { connection } = require("./redis.js");

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

new Worker(
    "email-queue",
    async (job) => {
        const { to, subject, html } = job.data;

        await transporter.sendMail({
            from: `"Email Service" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            html
        });

        console.log("Sent email to", to);
    },
    {
        connection,
        limiter: {
            max: 10,
            duration: 60000
        }
    }
);
