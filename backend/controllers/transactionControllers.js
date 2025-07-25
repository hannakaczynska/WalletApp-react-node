const {
  createTransaction,
  updateTransaction,
  getTransactions,
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
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Transaction updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error });
    next(error);
  }
};

const getAllTransactions = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    console.log("Fetching transactions with limit:", limit, "and offset:", offset);
    const transactions = await getTransactions(limit, offset);
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

module.exports = {
  addTransaction,
  editTransaction,
  getAllTransactions,
};

