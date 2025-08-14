const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WalletApp API",
      version: "1.0.0",
      description: "API documentation for the WalletApp project",
    },
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL || "http://localhost:3001",
      },
    ],
    components: {
      schemas: {
        UserResponse: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "The user's email",
              example: "johndoe@example.com",
            },
            name: {
              type: "string",
              description: "The user's name",
              example: "John Doe",
            },
            token: {
              type: "string",
              description: "The authentication token",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            id: {
              type: "string",
              description: "The user's ID",
              example: "64b8f9e2e4b0f5a1c2d3e4f5",
            },
            balance: {
              type: "number",
              description: "The user's account balance",
              example: 1000.0,
            },
          },
        },
        Transaction: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The transaction ID",
              example: "64b8f9e2e4b0f5a1c2d3e4f5",
            },
            type: {
              type: "string",
              description: "The type of transaction (income or expense)",
              example: "income",
            },
            category: {
              type: "string",
              description: "The category of the transaction",
              example: "Salary",
            },
            amount: {
              type: "number",
              description: "The amount of the transaction",
              example: 500.0,
            },
            date: {
              type: "string",
              format: "date",
              description: "The date of the transaction",
              example: "2023-08-01",
            },
            comment: {
              type: "string",
              description: "Additional comments about the transaction",
              example: "Monthly salary",
            },
            userId: {
              type: "string",
              description: "The ID of the user associated with the transaction",
              example: "64b8f9e2e4b0f5a1c2d3e4f5",
            },
          },
        },
        ExpenseStatistics: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The category name",
              example: "Products",
            },
            value: {
              type: "number",
              description: "The total amount for this category",
              example: 200.0,
            },
          },
        },
        IncomeStatistics: {
          type: "object",
          properties: {
            totalIncome: {
              type: "number",
              description: "The total income for the selected period",
              example: 1500.0,
            },
          },
        },
        RefreshTokenRequest: {
          type: "object",
          properties: {
            refreshToken: {
              type: "string",
              description: "The refresh token",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        RefreshTokenResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "The new access token",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;