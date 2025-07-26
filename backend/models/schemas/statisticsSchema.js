const Transaction = require("../Transaction");

const categories = [
  "Other expenses",
  "Leisure",
  "Education",
  "Household products",
  "Child care",
  "Self care",
  "Car",
  "Products",
  "Main expenses",
];

const getExpenseStatistics = async (month, year) => {
  try {
    const expenses = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $month: "$date" }, month] },
              { $eq: [{ $year: "$date" }, year] },
              { $eq: ["$type", "expense"] }, // Filter only expense transactions
            ],
          },
        },
      },
      {
        $group: {
          _id: "$category", // Group by category
          totalAmount: { $sum: "$amount" }, // Sum the amounts for each category
        },
      },
      {
        $match: {
          _id: { $in: categories }, // Include only categories from the diagram file
        },
      },
      {
        $addFields: {
          order: { $indexOfArray: [categories, "$_id"] }, // Assign order based on the categories array
        },
      },
      {
        $sort: { order: 1 }, // Sort by the order field
      },
      {
        $project: {
          _id: 0, // Exclude the `_id` field
          name: "$_id", // Rename `_id` to `name`
          value: "$totalAmount", // Rename `totalAmount` to `value`
        },
      },
      {
        $group: {
          _id: null,
          data: { $push: "$$ROOT" }, // Collect all results into an array
        },
      },
      {
        $project: {
          data: {
            $map: {
              input: categories,
              as: "category",
              in: {
                $mergeObjects: [
                  { name: "$$category", value: 0 }, // Default structure
                  {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$data",
                          as: "item",
                          cond: { $eq: ["$$item.name", "$$category"] },
                        },
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
        },
      },
      {
        $unwind: "$data", // Flatten the array back into individual documents
      },
      {
        $replaceRoot: { newRoot: "$data" }, // Replace the root with the `data` field
      },
    ]);

    return expenses;
  } catch (error) {
    console.error("Error fetching expense statistics:", error);
    throw error;
  }
};

const getIncomeStatistics = async (month, year) => {
  try {
    const incomes = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $month: "$date" }, month] },
              { $eq: [{ $year: "$date" }, year] },
              { $eq: ["$type", "income"] }, // Filter only income transactions
            ],
          },
        },
      },
      {
        $group: {
          _id: null, // Group all incomes together
          totalAmount: { $sum: "$amount" }, // Sum the amounts for all incomes
        },
      },
      {
        $project: {
          _id: 0,
          totalIncome: "$totalAmount", 
        },
      },
    ]);

    return incomes; // Return the first result or default if empty
  } catch (error) {
    console.error("Error fetching income statistics:", error);
    throw error;
  }
};

module.exports = {
  getExpenseStatistics,
  getIncomeStatistics,
};
