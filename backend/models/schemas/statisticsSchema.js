const Transaction = require("../Transaction");

const getTransactionStatistics = async (month, year) => {
  try {
    const transactions = await Transaction.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$date" }, month] },
          { $eq: [{ $year: "$date" }, year] },
        ],
      },
    });

    return transactions;
  } catch (error) {
    console.error("Error fetching transaction statistics:", error);
    throw error;
  }
};

module.exports = {
  getTransactionStatistics,
};
