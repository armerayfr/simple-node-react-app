const { Router } = require("express");
const router = Router();

const { login } = require("../controllers/user");

router.post("/login", login);

module.exports = router;
