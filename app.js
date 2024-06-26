require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cron = require("node-cron");

const logger = require("./logger");

const app = express();
const port = process.env.PORT;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

let cachedSlangData = null;
let lastUpdatedTime = null;
let isUpdating = false;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static("public"));

// Serve HTML Webpage to the user on Page Load
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.post("/getSlang", async (req, res, next) => {
  try {
    const userInput = req.body.text;
    const prompt = process.env.SLANG_PROMPT.replace("{userInput}", userInput);
    const slangResult = await run(prompt);
    res.send(slangResult);
  } catch (error) {
    next(error);
  }
});

app.post("/getSlangEtymology", async (req, res, next) => {
  try {
    const userInput = req.body.text;
    const prompt = process.env.SLANG_ETYMOLOGY_PROMPT.replace(
      "{userInput}",
      userInput
    );
    const slangEtymologyResult = await run(prompt);
    res.send(slangEtymologyResult);
  } catch (error) {
    next(error);
  }
});

app.post("/getSlangslator", async (req, res, next) => {
  try {
    const userInput = req.body.text;
    const prompt = process.env.SLANGSLATOR_PROMPT.replace(
      "{userInput}",
      userInput
    );
    const slangslatorResult = await run(prompt);
    res.send(slangslatorResult);
  } catch (error) {
    next(error);
  }
});

app.get("/getSlangtence", async (req, res, next) => {
  try {
    const prompt = process.env.SLANGTENCE_PROMPT;
    const slangtenceResult = await run(prompt);
    res.send(slangtenceResult);
  } catch (error) {
    next(error);
  }
});

// To check if data is fresh (within 24 hours)
function isDataFresh(lastTime) {
  const currentTime = Date.now();
  const expiryTime = 24 * 60 * 60 * 1000;
  return currentTime - lastTime < expiryTime;
}

// To fetch daily slangs from Gemini API
async function getDailySlangs() {
  const model = genAI.getGenerativeModel({ model: process.env.MODEL_NAME });
  const prompt = process.env.DAILY_SLANGS_PROMPT;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = await response.text();

    const jsonData = JSON.parse(generatedText);
    jsonData.cachedAt = Date.now();

    cachedSlangData = jsonData;
    lastUpdatedTime = Date.now();
  } catch (error) {
    logger.error("Error generating daily slangs:", error.message);
    throw error;
  } finally {
    isUpdating = false; // Reset updating flag
  }
}

// Fetch Slang Data when the Client hits this Endpoint
app.get("/slangData", (req, res, next) => {
  if (cachedSlangData && isDataFresh(lastUpdatedTime)) {
    return res.json(cachedSlangData);
  }

  if (isUpdating) {
    return res
      .status(503)
      .send("Slang data is currently being updated. Please try again shortly.");
  }

  isUpdating = true;
  getDailySlangs()
    .then(() => res.json(cachedSlangData))
    .catch((error) =>
      res.status(503).send("Error updating slang data. Please try again later.")
    );
});

// Basic Function API to generate content using Gemini
async function run(prompt) {
  const model = genAI.getGenerativeModel({ model: process.env.MODEL_NAME });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    logger.error("Error calling Gemini API:", error.message);
    throw error;
  }
}

// Server Health Check Route
app.get("/health", (req, res, next) => {
  try {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.status(200).sendFile("check.html", { root: "public" });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Central Error handling middleware
app.use((err, req, res, next) => {
  logger.error("Unhandled Error:", err);
  if (err.code) {
    switch (err.code) {
      case "INTERNAL_ERROR":
        return res.status(500).send("Internal Server Error (Gemini API Error)");
      case "BAD_REQUEST":
        return res.status(400).send("Invalid request");
      case "NOT_FOUND":
        return res.status(404).send("Data not found");
      case "UNAUTHORIZED":
        return res.status(401).send("Unauthorized");
      case "FORBIDDEN":
        return res.status(403).send("Forbidden");
      default:
        return res.status(500).send("Internal server error");
    }
  } else {
    res.status(500).send("Internal server error");
  }
});

// Catch-all for unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Catch-all for uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
});

// Server Start with Slang Data Fetch
app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);
  await getDailySlangs();

  // Cron job to update the slang data every day at 00:00 UTC
  cron.schedule(
    "0 0 * * *",
    async () => {
      await getDailySlangs();
    },
    {
      scheduled: true,
      timezone: "UTC",
    }
  );
});
