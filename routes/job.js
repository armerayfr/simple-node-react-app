const { Router } = require("express");
const router = Router();

const { jobs, job } = require("../controllers/job");
const auth = require("../middleware/auth");

router.get("/job/:id", auth, job);
router.get("/jobs", auth, jobs);

module.exports = router;
