# Multi-Bureau Credit Scoring & Risk Aggregation System

This system enables financial institutions to integrate and aggregate credit data from multiple bureaus (Experian, Equifax, and TransUnion). It normalizes diverse credit scores into a unified profile, handles bureau downtime gracefully, and optimizes real-time lending decisions.

## Project Structure

The project is a MERN stack application with:

- **Client**: React frontend with TypeScript
- **Server**: Express backend with TypeScript and MongoDB

## Features

- Fetch credit reports from multiple bureaus (Experian, Equifax, TransUnion)
- Aggregate credit scores using various methods:
  - Simple average
  - Weighted average
  - Lowest score (most conservative)
  - Highest score (most optimistic)
  - Median score
  - Custom weighting
- Handle bureau downtime gracefully
- Generate risk categories and lending recommendations
- Provide detailed credit report analysis
- Clean, modern UI for visualizing credit data

## Technology Stack

### Backend
- Node.js & Express.js
- TypeScript
- MongoDB with Mongoose
- RESTful API architecture

### Frontend
- React.js
- TypeScript
- Material-UI or Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```
git clone <repository-url>
cd multi-bureau-credit-system
```

2. Install backend dependencies
```
cd server
npm install
```

3. Create a `.env` file in the server directory with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/credit-bureau-system
EXPERIAN_API_KEY=your_experian_api_key
EQUIFAX_API_KEY=your_equifax_api_key
TRANSUNION_API_KEY=your_transunion_api_key
NODE_ENV=development
```

4. Start the backend
```
npm run dev
```

5. Install frontend dependencies
```
cd ../client
npm install
```

6. Start the frontend
```
npm start
```

## API Endpoints

### User Management
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `GET /api/users` - Get all users (admin)

### Credit Reports
- `POST /api/credit-reports/users/:userId/fetch` - Fetch credit reports from all bureaus
- `POST /api/credit-reports/users/:userId/aggregate` - Aggregate credit score using specified method
- `GET /api/credit-reports/users/:userId/profile` - Get latest credit profile (reports + aggregated score)
- `GET /api/credit-reports/users/:userId/bureaus/:bureau` - Get detailed report from a specific bureau

## Development Notes

- The system uses simulated credit bureau APIs since real ones require paid subscriptions
- In a production environment, you would integrate with actual credit bureau APIs 