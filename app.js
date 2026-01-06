const express = require("express");
const nodemailer = require("nodemailer")

const app = express();
app.use(express.json());

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  DEFAULT_TO,
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_PORT == 465, 
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

app.post("/send", async (req, res) => {
  const {
    to = DEFAULT_TO,
    subject = "📧 Notification",
    text,
    html,
  } = req.body || {};

  if (!to) {
    return res.status(400).json({
      success: false,
      message: "`to` email is required (body or DEFAULT_TO env)",
    });
  }

  try {
    await transporter.sendMail({
      from: `"No Reply" <${SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ---- HEALTH CHECK ----
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
  });
});

// ---- START SERVER ----
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`📨 Email service running on port ${PORT}`);
});
