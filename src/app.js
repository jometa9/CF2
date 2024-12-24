const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

module.exports = app;
