# Food Ordering System - Back-End

This repository contains the back-end implementation for a demo food ordering system. It provides a robust API to handle user authentication, menu management, order processing, and more, enabling seamless interaction between the front-end and the server.

## Features
- **User Authentication**: Secure registration and login with JWT.
- **Menu Management**: Create, read, update, and delete (CRUD) operations for food items and categories.
- **Order Management**: Place and track orders with real-time status updates.
- **RESTful API**: Easy-to-use and well-documented endpoints.

## Tech Stack
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for routing and middleware.
- **MongoDB**: Database for persisting data.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB.
- **JWT**: For secure user sessions.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 16.x or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ahmad-Shamsfard/food-back.git
   ```
2. Navigate to the project directory:
   ```bash
   cd nodefood
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration
Replace the configuration values directly in the source code as needed. Ensure your MongoDB URI, JWT secret, and other settings are properly configured before running the server.

### Running the Server
Start the development server:
```bash
npm start
```

