const {
  createTransaction,
  updateTransaction,
  getTransactions,
  fetchTransactionById,
  findAndDeleteTransaction,
} = require("../models/schemas/transactionSchema");

const addTransaction = async (req, res, next) => {
  try {
    const transaction = await createTransaction(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { transaction },
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating transaction", err });
    next(err);
  }
};

const editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await updateTransaction(id, req.body);
    const editedTransaction = await fetchTransactionById(id);
    if (!updatedTransaction || !editedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Transaction updated successfully",
      data: { transaction: editedTransaction },
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error });
    next(error);
  }
};

const getAllTransactions = async (req, res, next) => {
  try {
    const { limit, offset, userId } = req.query;
    console.log(
      "Fetching transactions with limit:",
      limit,
      "and offset:",
      offset,
      "for user:",
      userId
    );
    const transactions = await getTransactions(limit, offset, userId);
    res.status(200).json({
      status: "success",
      code: 200,
      data: { transactions },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
    next(error);
  }
};

const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const transaction = await fetchTransactionById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: { transaction },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transaction", error });
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await findAndDeleteTransaction(id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error });
    next(error);
  }
};

module.exports = {
  addTransaction,
  editTransaction,
  getAllTransactions,
  getTransactionById,
  deleteTransaction,
};
