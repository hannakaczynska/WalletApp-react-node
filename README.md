# WalletApp - Personal Finance Management

A full-stack web application for managing personal finances with transaction tracking, statistics, and user authentication.

![Wallet App](./frontend/public/logo.svg)

## 🌐 Live Demo

**🚀 [Try the Live App](https://wallet-app-project.netlify.app)**

- **Frontend**: Deployed on Netlify
- **Backend**: Deployed on Vercel
- **Demo Account**: Click "Try Demo" or use `demo@example.com` / `password123`

---

## 🚀 Features

- **User Authentication** with JWT tokens and refresh token system
- **Transaction Management** - Add, edit, and categorize income/expenses
- **Interactive Charts** - Visualize spending patterns with Recharts
- **Live Currency Exchange** - Real-time EUR and GBP exchange rates
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Real-time Balance** - Track your account balance
- **Monthly/Yearly Statistics** - Analyze your financial data
- **Demo Mode** - Try the app without registration

## 🛠️ Tech Stack

### Frontend
- **React** 18+ with Create React App
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Formik + Yup** for form handling
- **Recharts** for data visualization
- **Axios** for API calls
- **OpenExchangeRates API** for currency data
- **CSS Modules** for styling

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** authentication with refresh tokens
- **bcrypt** for password hashing
- **Swagger** for API documentation
- **CORS** enabled
- **Token blacklisting** for security
- **Vercel** for deployment

## 📁 Project Structure

```
WalletApp-react-node/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── ...
│   └── public/
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HannaRembiasz/wallet-app-fullstack.git
   cd wallet-app-fullstack
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create `.env` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   CRON_SECRET=your_cron_secret
   PORT=8080
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   
   Create `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:8080
   REACT_APP_OPEN_EXCHANGE_API_KEY=your_openexchangerates_api_key
   ```

   **Get your OpenExchangeRates API key:**
   - Sign up at [https://openexchangerates.org/](https://openexchangerates.org/)
   - Free tier provides 1,000 requests/month
   - Copy your API key to the `.env` file

### 🏃‍♂️ Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on http://localhost:8080

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   App runs on http://localhost:3000


## 📚 API Documentation

Visit http://localhost:8080/api-docs for Swagger API documentation when the backend is running.

## 🔐 Authentication

The app uses JWT tokens with refresh token rotation:
- **Access tokens**: Short-lived (1 hour)
- **Refresh tokens**: Long-lived (7 days)
- **Token blacklisting**: For secure logout
- **Automatic token refresh**: Keeps users authenticated without unnecessary logins

## 🎨 Demo Account

You can try the application without creating an account.

Try the app with the demo account:
- Click "Try Demo" on the login page
- Or use: `demo@example.com` / `password123`

Demo transactions are automatically generated in the backend seed mechanism.

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1279px  
- Desktop: ≥ 1280px

## 🚀 Deployment

### Live Deployment
- **Frontend**: [View live app](https://wallet-app-project.netlify.app)
- **Backend API**: [View backend API](https://wallet-app-fullstack.vercel.app/)
- **API Documentation**: [View API documentation](https://wallet-app-fullstack.vercel.app/api-docs/)

### Deploy Your Own Instance

#### Backend (Vercel)
```bash
cd backend
vercel login
vercel
vercel --prod
```

Set environment variables on Vercel:
```bash
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CRON_SECRET=your_cron_secret
SWAGGER_SERVER_URL=https://your-vercel-app-name.vercel.app
```

#### Frontend (Netlify)
1. Build the project:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
2. Drag the `build` folder to [Netlify Drop](https://app.netlify.com/drop)
3. Or connect your GitHub repository for automatic deployments

Set environment variables in Netlify:
- `REACT_APP_API_URL=https://your-vercel-app-name.vercel.com`
- `REACT_APP_OPEN_EXCHANGE_API_KEY=your_api_key`

## 🧪 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

Hanna Rembiasz - [hannarembiasz@gmail.com](mailto:hannarembiasz@gmail.com)

LinkedIn Profile: [Hanna Rembiasz](https://www.linkedin.com/in/hanna-rembiasz/)

Project Link: [Source code](https://github.com/HannaRembiasz/wallet-app-fullstack)
