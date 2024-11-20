---

# Todo List Application

A full-stack Todo List application built with **React** for the frontend and **Express.js** with **MongoDB** for the backend. This application allows users to perform CRUD operations (Create, Read, Update, Delete) on their tasks.

---

## **Features**

- Create a new task.
- View a list of tasks.
- Update existing tasks.
- Delete tasks from the list.
- Connects to a MongoDB database for persistent data storage.
- Implements RESTful API endpoints for backend operations.

---

## **Tech Stack**

### **Frontend**
- **React.js**: A JavaScript library for building user interfaces.
- **Axios**: For handling HTTP requests.

### **Backend**
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **dotenv**: For environment variable management.

---

## **Installation**

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### **1. Clone the Repository**
```bash
git clone https://github.com/Ekansh3503/TodoList-Mern.git
cd TodoList-Mern
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the `backend` directory with the following keys:

```env
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB connection string.

---

## **Usage**

### **1. Start MongoDB**
Make sure your MongoDB instance is running. For a local database, use:
```bash
mongod
```

### **2. Run the Backend**
From the `backend` directory:
```bash
npm start
```
The backend server will start on [http://localhost:5000](http://localhost:5000).

### **3. Run the Frontend**
From the `src` directory:
```bash
npm start
```
The frontend development server will start on [http://localhost:3000](http://localhost:3000).

### **4. Access the Application**
Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## **API Endpoints**

| Method | Endpoint        | Description                  |
|--------|-----------------|------------------------------|
| GET    | `/api/items`    | Fetch all tasks             |
| POST   | `/api/items`    | Create a new task           |
| PUT    | `/api/items/:id`| Update an existing task     |
| DELETE | `/api/items/:id`| Delete a task by ID         |

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

