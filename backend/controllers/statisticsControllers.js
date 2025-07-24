const {
  getTransactionStatistics,
} = require("../models/schemas/statisticsSchema");

const getStatistics = async (req, res, next) => {
  try {
    const { month, year } = req.query;

    const currentDate = new Date();
    const selectedMonth = month ? parseInt(month) : currentDate.getMonth() + 1; 
    const selectedYear = year ? parseInt(year) : currentDate.getFullYear(); 

    console.log(`Selected Month: ${selectedMonth}, Selected Year: ${selectedYear}`);
    const statistics = await getTransactionStatistics(selectedMonth, selectedYear);

    res.status(200).json({
      status: "success",
      code: 200,
      data: { statistics },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error });
    next(error);
  }
};

module.exports = {
  getStatistics,
};
