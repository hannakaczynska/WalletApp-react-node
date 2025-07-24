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

const getTransactions = async () => {
  const transactions = await Transaction.find();
  return transactions;
}

module.exports = {
  createTransaction,
  updateTransaction,
  getTransactions,
};