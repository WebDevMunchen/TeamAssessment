const Candidate = require("../models/candidate-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const bcrypt = require("bcrypt");

const createCandidate = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, department } = req.body;

  const candidate = await Candidate.create({
    firstName,
    lastName,
    department,
  });

  res.status(201).json(candidate);
});

const getCandidate = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const candidate = await Candidate.findById(id).populate("evaluator");

  if (!candidate) {
    throw new ErrorResponse(404, "Candidate not found!");
  } else {
    res.json(candidate);
  }
});

const getCandidates = asyncWrapper(async (req, res, next) => {
  const candidates = await Candidate.find({}).sort({ department: 1 });

  res.json(candidates);
});

const updateCandidate = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { assessmentGrade } = req.body;
  const { id: userID } = req.user;

  const candidate = await Candidate.findById(id);

  if (!candidate) {
    throw new ErrorResponse("Candidate not found!", 404);
  }

  if (candidate.evaluator.includes(userID)) {
    throw new ErrorResponse("User already voted!", 400);
  }

  const evaluator = [...candidate.evaluator, userID];
  const assessmentGrades = [...candidate.assessmentGrade, assessmentGrade];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const randomizedEvaluator = shuffleArray(evaluator);
  const randomizedGrades = shuffleArray(assessmentGrades);

  candidate.evaluator = randomizedEvaluator;
  candidate.assessmentGrade = randomizedGrades;

  const updatedCandidate = await candidate.save();

  res.json(updatedCandidate);
});

module.exports = {
  createCandidate,
  getCandidate,
  updateCandidate,
  getCandidates,
};
