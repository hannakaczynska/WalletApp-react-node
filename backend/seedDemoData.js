require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

const User = require("../backend/models/User");
const Transaction = require("../backend/models/Transaction");

async function seedDemoData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB ✅");

    const demoEmail = "demo@example.com";
    const demoUser = await User.findOne({ email: demoEmail });
    if (demoUser) {
      await Transaction.deleteMany({ userId: demoUser._id });
      await User.deleteOne({ _id: demoUser._id });
      console.log("Old demo data removed");
    }

    const hashedPassword = await bcrypt.hash("password123", 10);
    const newDemoUser = await User.create({
      name: "Demo User",
      email: demoEmail,
      password: hashedPassword,
    });

    console.log("Demo user created");

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

    let transactions = [];
    let totalIncome = 0;
    let totalExpense = 0;
    for (let i = 0; i < 15; i++) {
      const type = faker.helpers.arrayElement(["income", "expense"]);
      const amount = parseFloat(faker.finance.amount(5, 500, 2));
      transactions.push({
        userId: newDemoUser._id,
        type,
        category:
          type === "expense"
            ? faker.helpers.arrayElement(categories)
            : undefined,
        amount,
        date: faker.date.between({
          from: new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1,
            1
          ),
          to: new Date(),
        }),
        comment: faker.lorem.words({ min: 1, max: 3 }).slice(0, 15),
      });
      if (type === "income") {
        totalIncome += amount;
      } else {
        totalExpense += amount;
      }
    }

    await Transaction.insertMany(transactions);
    console.log("Fake transactions added");

    const balance = totalIncome - totalExpense;

    newDemoUser.balance = balance;
    await newDemoUser.save();
    console.log("Demo user balance updated");

    console.log("✅ Demo data seeding complete!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDemoData();
