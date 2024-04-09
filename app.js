const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { requiresAuth } = require('express-openid-connect');

const authMiddleWare = require("./auth/auth0");
const logger = require("./logging/logger");

const CONFIG = require("./config/config");

//  Routes
const bookRouter = require("./routes/books");

const connectToDb = require("./db/mongodb");

const app = express();

//  Connect to Mongodb Database
connectToDb();

// Add middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(authMiddleWare);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
// Apply the rate limiting middleware to all requests.
app.use(limiter);

// Security Malware
app.use(helmet());

app.use("/api/v1/books", requiresAuth(), bookRouter);

app.get("/", (req, res) => {
  res.send("Hello Bookstore");
});

// Error handler middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  const errorStatus = err.status || 500;
  res.status(errorStatus).send(err.message);

  next();
});

app.listen(CONFIG.PORT, () => {
  logger.info(`Server started successfully on http://localhost:${CONFIG.PORT}`);
});
