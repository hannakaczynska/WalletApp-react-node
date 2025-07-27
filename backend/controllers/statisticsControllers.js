const {
  getExpenseStatistics,
  getIncomeStatistics
} = require("../models/schemas/statisticsSchema");

const getStatistics = async (req, res, next) => {
  try {
    const { month, year } = req.query;

    const currentDate = new Date();
    const selectedMonth = month ? parseInt(month) : currentDate.getMonth() + 1; 
    const selectedYear = year ? parseInt(year) : currentDate.getFullYear(); 
    const expenses = await getExpenseStatistics(selectedMonth, selectedYear);
    const income = await getIncomeStatistics(selectedMonth, selectedYear);

    res.status(200).json({
      status: "success",
      code: 200,
      data: { expenses, income },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error });
    next(error);
  }
};

module.exports = {
  getStatistics,
};
