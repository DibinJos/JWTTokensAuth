const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const user = require("../model/userDetails");
const auth = require("../auth/auth");

router.post("/users/login", async (req, res) => {
  console.log(req.body);
  const token = generateToken(req.body.id);
  const userDet = new user(req.body);
  userDet.tokens = userDet.tokens.concat({ token });
  userDet.save();
  res.send(userDet);
});

// router.post("/users/login", async (req, res) => {
//   console.log(req.body);
//   res.send(req.user);
// });

router.post("/users/signup", async (req, res) => {
  const userDet = new user(req.body);
  userDet.save();
});

router.get("/users", auth, async (req, res) => {
  try {
    const users = await user.find({});
    res.send({ users });
  } catch (e) {
    res.status(500).send("Unable to fetch");
  }
});

// router.put("/users", async (req, res) => {});

// router.delete("/users", async (req, res) => {});

router.get("/logout", auth, async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });

    console.log("Req user is", req.user);
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/logoutAll", auth, async (req, res, next) => {
  try {
    req.user.tokens = [];

    console.log("Req user is", req.user);
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

generateToken = id => {
  const token = jwt.sign(id, "SignThisPassword");
  return token;
};

module.exports = router;
