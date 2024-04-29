const { Schema, model } = require("mongoose");

const candidateSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  assessmentGrade: [{ type: String }],
  department: {type: String, required: true},
  evaluator: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Candidate = model("Candidate", candidateSchema);

module.exports = Candidate;
