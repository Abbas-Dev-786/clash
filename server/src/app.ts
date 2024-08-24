import express, { Application } from "express";
import path from "path";
import { fileURLToPath } from "url";
import sendMail from "./services/Mail.js";
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";

export const __dirName = path.dirname(fileURLToPath(import.meta.url));

const app: Application = express();

// body middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// template view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirName, "./views"));

app.get("/", async (req, res) => {
  try {
    await emailQueue.add(emailQueueName, {
      to: "abbasbhp787@gmail.com",
      subject: "This is a test mail",
      templateName: "welcome",
    });
    // await sendMail("abbasbhp787@gmail", "This is a test mail", "welcome");
    return res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.log(err);
  }
});

export default app;
