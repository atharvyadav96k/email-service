const express = require("express")
const {sendEmail} = require("./sendEmail")
require("dotenv").config()

const app = express();
app.use(express.json());

app.post("/api/email/send", async (req, res) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({
      error: "to, subject, html are required"
    });
  }

  try {
    await sendEmail({ to, subject, html });

    res.json({
      success: true,
      message: "Email queued successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to queue email"
    });
  }
});

app.listen(3000, () => {
  console.log("Email API running on port 3000");
});
