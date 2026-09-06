const express = require("express");
const {
  login,
  logout,
  me,
  register,
} = require("../controllers/authController");
const asyncHandler = require("../middleware/asyncHandler");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/logout", logout);
router.get("/me", protect, me);

module.exports = router;
