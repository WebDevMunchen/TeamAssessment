const express = require("express");

const {
  createCandidate,
  getCandidate,
  updateCandidate,
  getCandidates,
} = require("../controllers/candidate-controller.js");

const { authenticate } = require("../middlewares/authentication.js");

const candidateRoute = express.Router();

candidateRoute.route("/candidateList").get(authenticate, getCandidates);
candidateRoute.route("/create").post(createCandidate);
candidateRoute.route("/:id").get(getCandidate);
candidateRoute.route("/update/:id").put(authenticate, updateCandidate);

module.exports = candidateRoute;
