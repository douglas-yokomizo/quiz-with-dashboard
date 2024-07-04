import mongoose from "mongoose";

const rankingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  score: {
    type: Number,
    required: true,
  },
  timeSpent: {
    type: Number,
    required: true,
  }
});

const Ranking = mongoose.model("Ranking", rankingSchema);

export default Ranking;