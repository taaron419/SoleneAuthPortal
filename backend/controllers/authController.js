const jwt = require("jsonwebtoken");
const { User } = require("../models");

function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required",
    });
  }

  const existingUser = await User.findOne({
    where: { email: email.trim().toLowerCase() },
  });
  if (existingUser) {
    return res
      .status(409)
      .json({ success: false, message: "Email is already registered" });
  }

  const user = await User.create({ name: name.trim(), email, password });
  const token = createToken(user.id);
  setAuthCookie(res, token);

  return res.status(201).json({ success: true, user: publicUser(user) });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  const user = await User.findOne({
    where: { email: email.trim().toLowerCase() },
  });
  const isPasswordValid = user && (await user.comparePassword(password));

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  setAuthCookie(res, createToken(user.id));
  return res.json({ success: true, user: publicUser(user) });
}

function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "lax",
  });

  return res.json({ success: true, message: "Logged out successfully" });
}

function me(req, res) {
  return res.json({ success: true, user: publicUser(req.user) });
}

module.exports = { register, login, logout, me };
