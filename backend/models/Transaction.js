const mongoose = require("mongoose");

const transactionSchema = {
  type: { type: String, required: true },
  category: { type: String, required: false },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  comment: { type: String, required: false },
//   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}

module.exports = mongoose.model("Transaction", new mongoose.Schema({
  ...transactionSchema,
}));
