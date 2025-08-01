const Transaction = require("../Transaction");

const createTransaction = async (body) => {
  const transaction = await Transaction.create(body);
  return transaction;
}

const updateTransaction = async (id, body) => {
  const findTransaction = await Transaction.findById(id);
  if (!findTransaction) {
    return false;
  }
  const updatedTransaction = await Transaction.findByIdAndUpdate(id, body);
  return updatedTransaction;
}

const getTransactions = async (limit, offset) => {
  const transactions = await Transaction.find().sort({date: -1}).skip(offset).limit(limit);
  return transactions;
}

const fetchTransactionById = async (id) => {
  const transaction = await Transaction.findById(id);
  return transaction; 
}

const findAndDeleteTransaction = async (id) => {
  const deletedTransaction = await Transaction.findByIdAndDelete(id);
  return deletedTransaction;
}

module.exports = {
  createTransaction,
  updateTransaction,
  getTransactions,
  fetchTransactionById,
  findAndDeleteTransaction
};