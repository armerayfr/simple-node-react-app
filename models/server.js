const cors = require("cors");
const express = require("express");
const expressPinoLogger = require("express-pino-logger");

const sequelize = require("../config/database");
const logger = require("../utils/logger");
const httpLogger = require("../utils/httpLogger");
const {
  logError,
  returnError,
  isOperationalError,
} = require("../utils/errorHandler");

class Server {
  constructor() {
    this.app = express();
    this.port = 2000;
    this.paths = {
      home: "/",
    };
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(httpLogger);
    this.app.use(
      expressPinoLogger({
        logger,
        autoLogging: false,
      })
    );
  }

  //bind controllers to routes
  routes() {
    this.app.use(this.paths.home, require("../routes/user"));
    this.app.use(this.paths.home, require("../routes/job"));

    //handling error

    // if the Promise is rejected this will catch it
    process.on("unhandledRejection", (error) => {
      throw error;
    });

    process.on("uncaughtException", (error) => {
      logError(error);

      if (!isOperationalError(error)) {
        process.exit(1);
      }
    });

    this.app.use(logError);
    this.app.use(returnError);
  }

  database() {
    (async () => {
      try {
        await sequelize.sync();
        logger.info("Sequelize Connection has been established successfully");
      } catch (err) {
        logger.error("Unable to connect to the database:", err);
      }
    })();
  }

  listen() {
    this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
