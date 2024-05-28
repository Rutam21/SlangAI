const winston = require("winston");
const path = require("path");
const fs = require("fs-extra");
const DailyRotateFile = require("winston-daily-rotate-file");

const logDir = path.join(__dirname, "logs");

fs.ensureDirSync(logDir);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new DailyRotateFile({
      filename: path.join(logDir, "error-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "14d", // Keep logs for 14 days
    }),
    new DailyRotateFile({
      filename: path.join(logDir, "combined-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d", // Keep logs for 14 days
    }),
  ],
});

module.exports = logger;
