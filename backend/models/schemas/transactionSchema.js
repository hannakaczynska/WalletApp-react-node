const Transaction = require("../Transaction");
const User = require("../User");

const createTransaction = async (body) => {
  const {amount, type, userId} = body;
  const transaction = await Transaction.create(body);
  if (transaction) {
    const user = await User.findById(userId);
    if (user) {
      if (type === "income") {
        user.balance += amount;
      } 
      if (type === "expense") {
        user.balance -= amount;
      }
      await user.save();
    } else {
      console.error("User not found with ID:", userId);
      throw new Error("User not found");
    }
  }
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
  if (updatedTransaction) {
    const user = await User.findById(userId);
    if (user) {
      if (body.type === "income") {
        user.balance = user.balance - findTransaction.amount + body.amount; 
      } else if (body.type === "expense") {
        user.balance = user.balance + findTransaction.amount - body.amount;
      }
      await user.save();
    }
  }
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
  console.log("Deleted transaction:", deletedTransaction);
  if (deletedTransaction) {
    const user = await User.findById(userId);
    if (user) {
      if (deletedTransaction.type === "income") {
        user.balance -= deletedTransaction.amount;
      } else if (deletedTransaction.type === "expense") {
        user.balance += deletedTransaction.amount;
      }
      await user.save();
    }
  }
  return deletedTransaction;
}

module.exports = {
  createTransaction,
  updateTransaction,
  getTransactions,
  fetchTransactionById,
  findAndDeleteTransaction
};