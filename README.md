🍴 Restaurant Management System

A backend system for managing restaurant operations including menu, table reservations, orders, and bookings.
Built with Node.js, Express, and MongoDB.

🚀 Features

📋 Manage restaurant menu (add, update, delete items)

🍽 Manage table reservations

🛒 Place and track customer orders

📆 Handle customer reservations

📦 MongoDB database integration

🛠 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Tools: Postman for API testing

📂 Project Structure
restaurant-backend/
 ├── routes/
 │   ├── menuRoutes.js         # Menu APIs
 │   ├── tableRoutes.js        # Table APIs
 │   ├── orderRoutes.js        # Order APIs
 │   └── reservationRoutes.js  # Reservation APIs
 ├── models/                   # Mongoose models
 ├── controllers/              # Business logic
 ├── db.js                     # MongoDB connection
 ├── server.js                 # App entry point
 └── .env                      # Environment variables

⚙️ Setup & Installation

1️⃣ Clone the repository:

git clone https://github.com/your-username/restaurant-management-system.git


2️⃣ Install dependencies:

npm install


3️⃣ Create a .env file in the project root with:

MONGO_URI=your_mongodb_connection_string
PORT=5000


4️⃣ Run the server:

npm start


The backend runs on http://localhost:5000

📌 API Endpoints
📋 Menu

GET /api/menu → Get all menu items

POST /api/menu → Add new menu item

PUT /api/menu/:id → Update menu item

DELETE /api/menu/:id → Delete menu item

🍽 Tables

GET /api/tables → Get all tables

POST /api/tables → Add new table

🛒 Orders

GET /api/orders → Get all orders

POST /api/orders → Create new order

📆 Reservations

GET /api/reservations → Get all reservations

POST /api/reservations → Make a reservation

👩‍💻 Author

Developed by Ayesha Saeed 
