const morgan = require("morgan");
const json = require("morgan-json");
const format = json({
  method: ":method",
  url: ":url",
  status: ":status",
  contentLength: ":res[content-length]",
  responseTime: ":response-time",
});

const logger = require("./logger");
const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const { method, url, status, contentLength, responseTime } =
        JSON.parse(message);

      const child = logger.child({
        timestamp: new Date().toString(),
        method,
        url,
        status: Number(status),
        contentLength,
        responseTime: Number(responseTime),
      });

      if (+status >= 400 && +status < 500) {
        return child.warn(`HTTP Access Log`);
      } else if (+status >= 500) {
        return child.error(`HTTP Access Log`);
      } else if (+status >= 300 && +status < 400) {
        return child.silent(`HTTP Access Log`);
      } else {
        return child.info(`HTTP Access Log`);
      }
    },
  },
});

module.exports = httpLogger;
