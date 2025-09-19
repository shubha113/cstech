# MERN Stack Assignment - Backend

This is the backend implementation for the MERN Stack Developer assignment, built with Node.js, Express.js, and MongoDB.

## Features

1. **Admin User Login** - JWT-based authentication with cookies
2. **Agent Management** - Create and manage agents
3. **File Upload & Distribution** - Upload CSV/Excel files and distribute among agents

## Project Structure

```
backend/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── agentController.js
│   └── listController.js
├── middlewares/
│   ├── auth.js
│   ├── catchAsyncError.js
│   └── errorMiddleware.js
├── models/
│   ├── User.js
│   ├── Agent.js
│   └── List.js
├── routes/
│   ├── authRoutes.js
│   ├── agentRoutes.js
│   └── listRoutes.js
├── uploads/
├── utils/
│   └── errorHandler.js
├── .env
├── app.js
├── server.js
└── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone/Create the project directory**
   ```bash
   mkdir backend
   cd backend
   ```

2. **Initialize and install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file** in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mern_assignment
   JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
   NODE_ENV=development
   ```

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   mongod
   ```

5. **Create admin user** (run this once)
   ```bash
   npm run seed
   ```
   This creates an admin user with:
   - Email: admin@example.com
   - Password: admin123

6. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register admin user
- `POST /api/v1/auth/login` - Login admin user
- `POST /api/v1/auth/logout` - Logout user

### Agents
- `POST /api/v1/agents/create` - Create new agent (requires authentication)
- `GET /api/v1/agents/all` - Get all agents (requires authentication)

### File Upload & Distribution
- `POST /api/v1/lists/upload` - Upload CSV/Excel and distribute among agents (requires authentication)
- `GET /api/v1/lists/distributed` - Get distributed lists for all agents (requires authentication)

### Health Check
- `GET /api/health` - Server health check

## Usage

### 1. Login as Admin
```javascript
POST /api/v1/auth/login
Content-Type: application/json

```

### 2. Create Agents
```javascript
POST /api/v1/agents/create
Content-Type: application/json
Cookie: token=your_jwt_token

{
  "name": "Agent Name",
  "email": "agent@example.com",
  "mobile": "+1234567890",
  "password": "password123"
}
```

### 3. Upload and Distribute File
```javascript
POST /api/v1/lists/upload
Content-Type: multipart/form-data
Cookie: token=your_jwt_token

Form Data:
- file: your_file.csv (or .xlsx, .xls)
```

**CSV Format Required:**
```csv
FirstName,Phone,Notes
John,1234567890,Follow up required
Jane,9876543210,Interested in product
```

## File Upload Validation

- **Supported formats:** CSV, XLSX, XLS
- **Required columns:** FirstName, Phone, Notes
- **File size limit:** 5MB
- **Distribution logic:** Items are distributed equally among agents, with remainder distributed sequentially

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **csv-parser** - CSV file parsing
- **xlsx** - Excel file parsing

## Error Handling

The application includes comprehensive error handling:
- Input validation errors
- Authentication errors
- File upload errors
- Database errors
- Custom error messages with appropriate HTTP status codes

## Security Features

- Password hashing using bcryptjs
- JWT token authentication
- HTTP-only cookies
- File type validation
- File size limits
- CORS protection

## Notes

- The application automatically creates an `uploads/` directory for temporary file storage
- Uploaded files are deleted after processing
- Agent passwords are hashed before storing in the database
- The distribution algorithm ensures equal distribution with remainder items distributed sequentially