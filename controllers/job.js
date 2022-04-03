const { OK } = require("../utils/httpStatusCodes");
const logger = require("../utils/logger");
const { responseData } = require("../utils/successHandler");
const axios = require("axios");

const jobs = async (req, res, next) => {
  let url = "http://dev3.dansmultipro.co.id/api/recruitment/positions.json?";
  const { description, location, full_time } = req.query;

  try {
    if (description !== undefined) url += `description=${description}&`;
    if (location !== undefined) url += `location=${location}&`;
    if (full_time !== undefined) url += `full_time=${full_time}`;

    const jobList = await axios.get(url);

    responseData(res, OK, jobList.data);
  } catch (err) {
    next(err);
  }
};

const job = async (req, res, next) => {
  try {
    const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${req.params.id}`;
    const job = await axios.get(url);

    if (job.data.id === undefined) {
      throw new Api404Error("id not match");
    }

    res.status(200).send(job.data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  jobs,
  job,
};
