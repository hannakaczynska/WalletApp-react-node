const Transaction = require("../Transaction");

const createTransaction = async (body) => {
  const transaction = await Transaction.create(body);
  return transaction;
}

const updateTransaction = async (id, body) => {
  const updatedTransaction = await Transaction.findById(id);
  if (!updatedTransaction) {
    return false;
  } 
  await Transaction.findByIdAndUpdate(id, body);
  return true;
}

const getTransactions = async (limit, offset) => {
  const transactions = await Transaction.find().sort({date: -1}).skip(offset).limit(limit);
  return transactions;
}

module.exports = {
  createTransaction,
  updateTransaction,
  getTransactions,
};