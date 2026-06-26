# PhytoLab Server

PhytoLab Server is a backend system designed for a healthcare SaaS platform. it provides a robust API for managing diagnostic laboratories (PhytoLabs), test catalogs, and patient reports. The system is built with a focus on clear role separation between administrators and laboratory operators.

## 🚀 Use Cases

### 1. Laboratory Management (Admin)
- **Lab Account Creation**: Administrators can onboard new laboratories by creating dedicated accounts.
- **Access Control**: Secure authentication and management of laboratory credentials.

### 2. Test Catalog Management (Admin)
- **Categorization**: Organize tests into categories (e.g., Biochemistry, Hematology).
- **Test Collections**: Group related tests together for easier selection and reporting.
- **Detailed Test Definitions**: Define individual tests with reference ranges, units, and notes.

### 3. Patient Report Management (PhytoLab)
- **Report Generation**: Laboratories can create detailed diagnostic reports for patients.
- **Patient Tracking**: Maintain records of patient demographics (name, age, gender) and reference doctors.
- **Data Collections**: Manage historical test data and report collections.

## 🛠 Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/) (v5.1.0)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) (v8.16.0)
- **Security**: 
  - [JWT](https://jwt.io/) for secure API authentication.
  - [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing.
- **Environment Management**: [dotenv](https://www.npmjs.com/package/dotenv)
- **Development Tools**: [Nodemon](https://nodemon.io/), [Prettier](https://prettier.io/)

## 📂 Directory Structure

```text
src/
├── controllers/    # Business logic for each resource
├── db/             # Database connection logic
├── middlewares/    # Authentication  middlewares
├── models/         # Mongoose schemas and models
├── routes/         # Express route definitions
├── utils/          # Standardized error and response helpers
├── app.js          # Express app configuration
├── constants.js    # Global constants and environment variables
└── index.js        # Server entry point
```

## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication. Tokens can be provided via:
- **HTTP Cookies**: `accessToken` cookie.
- **Authorization Header**: `Bearer <token>`

There are two primary authorization levels:
- `verifyAdmin`: Restricted to administrative tasks (lab management, catalog setup).
- `verifyPhytolab`: Restricted to lab-specific tasks (reporting, data entry).

## 🚦 API Endpoints (High Level)

### Admin Routes (`/api/v1/admin`)
- Lab management: `POST /phytolab`, `GET /phytolab`, `PUT /phytolab/:phytolab`
- Catalog management: `/testCategory`, `/testCollection`, `/tests`

### PhytoLab Routes (`/api/v1/auth`, `/api/v1/report`)
- Authentication: `POST /auth/login`
- Report management: `POST /report`, `GET /report/:reportId`, `PUT /report/:reportId`

## ⚙️ Setup & Installation

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lab-server
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory based on `.env.sample`:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   DB_NAME=phytolab
   JWT_SECRET=your_jwt_secret
   ADMIN_SECRET=your_admin_secret
   ```

4. **Run the server**
   ```bash
   # Development mode
   pnpm dev

   # Production mode
   pnpm start
   ```

## 🤝 Contribution

Contributions are welcome! Please ensure you follow the existing code style and run Prettier before submitting any pull requests.