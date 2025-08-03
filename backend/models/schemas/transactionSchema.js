const Transaction = require("../Transaction");

const createTransaction = async (body) => {
  const transaction = await Transaction.create(body);
  return transaction;
}

const updateTransaction = async (id, userId, body) => {
  const findTransaction = await Transaction.findOne({ _id: id, userId })
  if (!findTransaction) {
    return false;
  }
   const updatedTransaction = await Transaction.findOneAndUpdate(
    { _id: id, userId },
    body,
    { new: true }
  );
  return updatedTransaction;
}

const getTransactions = async (limit, offset, userId) => {
  const transactions = await Transaction.find({ userId }).sort({ date: -1 }).skip(offset).limit(limit);
  return transactions;
}

const fetchTransactionById = async (id, userId) => {
  const transaction = await Transaction.findOne({ _id: id, userId });
  return transaction;
}

const findAndDeleteTransaction = async (id, userId) => {
  const deletedTransaction = await Transaction.findOneAndDelete({ _id: id, userId });
  return deletedTransaction;
}

module.exports = {
  createTransaction,
  updateTransaction,
  getTransactions,
  fetchTransactionById,
  findAndDeleteTransaction
};