const { Router } = require("express");
const router = Router();

const { jobs, job } = require("../controllers/job");

router.get("/job/:id", job);
router.get("/jobs", jobs);

module.exports = router;
