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
        url: "http://localhost:3001",
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
      },
    },
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;