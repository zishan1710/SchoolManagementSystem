# School Management Web Application

A comprehensive web-based school management system with student & fee management built with React.js frontend and Java Spring Boot 3.9 backend.

## 📋 Project Overview

This is a full-stack application designed to help schools manage:
- **Public Website**: Modern landing page with school information
- **Admin Dashboard**: Complete student and finance user management
- **Finance Dashboard**: Fee collection and reporting
- **Authentication**: Role-based access control (Admin & Finance users)
- **Fee Management**: Monthly fee tracking, payment status, and reporting

## ✨ Features

### Public Website
- ✅ Responsive navigation with smooth scrolling
- ✅ Hero section with call-to-action
- ✅ School information (About, Vision, Mission)
- ✅ Academic classes display (Class 1-10)
- ✅ Facilities showcase (Smart Classrooms, Library, Computer Lab, etc.)
- ✅ Image gallery with 8+ sample images
- ✅ Contact information and social media links
- ✅ Professional footer

### Admin Dashboard
- ✅ Dashboard overview with key metrics
- ✅ Student Management (CRUD operations)
- ✅ Search and filter students by name, ID, or class
- ✅ Finance User Management
- ✅ Fee overview and management
- ✅ Monthly reports with class-wise summary
- ✅ Real-time statistics

### Finance Dashboard
- ✅ Dashboard with fee collection metrics
- ✅ Student fee list viewing
- ✅ Mark fees as paid/unpaid
- ✅ Filter fees by: Payment Status, Class, Month
- ✅ Monthly fee reports
- ✅ Class-wise fee summary

### Authentication & Security
- ✅ JWT-based authentication
- ✅ Bcrypt password hashing
- ✅ Role-based access control
- ✅ Protected routes for admin/finance users
- ✅ Secure API endpoints

### Fee Management
- ✅ Fee structure per class and student type
- ✅ Day Scholar (₹500) and Hostler (₹300) fees
- ✅ Monthly fee records tracking
- ✅ Payment status management
- ✅ Payment date recording
- ✅ One fee record per student per month
- ✅ Fee filtering and reporting

## 🛠️ Tech Stack

### Frontend
- **React.js** 18.2.0
- **React Router DOM** 6.11.0
- **Axios** for API calls
- **CSS3** for styling
- **Font Awesome** for icons
- **Date-fns** for date handling

### Backend
- **Java 21**
- **Spring Boot 3.3.0**
- **Spring Data JPA**
- **Spring Security**
- **PostgreSQL** database
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Maven** for build management

## 📦 Project Structure

```
school-management-app/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── PrivateRoute.js
│   │   │   ├── StudentManagement.js
│   │   │   ├── FinanceUserManagement.js
│   │   │   ├── FeeOverview.js
│   │   │   ├── FeeManagement.js
│   │   │   └── MonthlyReport.js
│   │   ├── pages/
│   │   │   ├── PublicWebsite.js
│   │   │   ├── LoginPage.js
│   │   │   ├── AdminDashboard.js
│   │   │   └── FinanceDashboard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── App.css
│   │   │   ├── LoginPage.css
│   │   │   ├── PublicWebsite.css
│   │   │   ├── Dashboard.css
│   │   │   └── Management.css
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── src/main/java/com/school/
│   │   ├── config/
│   │   │   └── DataInitializer.java
│   │   ├── controller/
│   │   │   ├── AuthController.java
│   │   │   ├── StudentController.java
│   │   │   ├── UserController.java
│   │   │   ├── FeeRecordController.java
│   │   │   ├── ClassController.java
│   │   │   ├── DashboardController.java
│   │   │   └── ReportController.java
│   │   ├── dto/
│   │   │   ├── LoginRequest.java
│   │   │   ├── LoginResponse.java
│   │   │   ├── UserDTO.java
│   │   │   ├── StudentDTO.java
│   │   │   ├── ClassDTO.java
│   │   │   ├── FeeStructureDTO.java
│   │   │   └── FeeRecordDTO.java
│   │   ├── entity/
│   │   │   ├── User.java
│   │   │   ├── UserRole.java
│   │   │   ├── Class.java
│   │   │   ├── Student.java
│   │   │   ├── StudentType.java
│   │   │   ├── FeeStructure.java
│   │   │   ├── FeeRecord.java
│   │   │   └── PaymentStatus.java
│   │   ├── exception/
│   │   │   ├── AuthenticationException.java
│   │   │   ├── ResourceNotFoundException.java
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── repository/
│   │   │   ├── UserRepository.java
│   │   │   ├── ClassRepository.java
│   │   │   ├── StudentRepository.java
│   │   │   ├── FeeStructureRepository.java
│   │   │   └── FeeRecordRepository.java
│   │   ├── service/
│   │   │   ├── AuthService.java
│   │   │   ├── UserService.java
│   │   │   ├── StudentService.java
│   │   │   ├── FeeRecordService.java
│   │   │   ├── ReportService.java
│   │   │   └── DashboardService.java
│   │   ├── util/
│   │   │   └── JwtUtil.java
│   │   └── SchoolManagementApplication.java
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── application-prod.yml
│   ├── pom.xml
│   ├── Dockerfile
│   └── .gitignore
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Java 21** and Maven
- **PostgreSQL** 12+
- **Docker** and **Docker Compose** (optional, for containerized setup)

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd school-management-app
```

#### 2. Backend Setup

```bash
cd backend

# Configure database connection
# Edit src/main/resources/application.yml if needed

# Build and run
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080/api`

#### 3. Frontend Setup

```bash
cd frontend

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will start on `http://localhost:3000`

### Using Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Services will be available at:
# Frontend: http://localhost:3000
# Backend: http://localhost:8080/api
# Database: localhost:5432
```

## 📝 Demo Credentials

**Admin User:**
- Email: `admin@school.com`
- Password: `admin123`

**Finance User:**
- Email: `finance@school.com`
- Password: `finance123`

## 🔐 API Endpoints

### Authentication
```
POST   /auth/login              - Login user
GET    /auth/health             - Health check
```

### Students
```
GET    /students                - Get all students
GET    /students/{id}           - Get student by ID
GET    /students/class/{classId} - Get students by class
GET    /students/search         - Search students
POST   /students                - Create student
PUT    /students/{id}           - Update student
DELETE /students/{id}           - Delete student
```

### Finance Users
```
POST   /users/finance           - Create finance user
GET    /users/finance/all       - Get all finance users
GET    /users/finance/active    - Get active finance users
GET    /users/{id}              - Get user by ID
PUT    /users/{id}              - Update finance user
PUT    /users/{id}/deactivate   - Deactivate finance user
```

### Fee Records
```
POST   /fee-records/create      - Create fee record
GET    /fee-records             - Get all fee records
GET    /fee-records/{id}        - Get fee record by ID
GET    /fee-records/student/{studentId} - Get records by student
GET    /fee-records/month/{month}       - Get records by month
GET    /fee-records/status/{status}     - Get records by status
GET    /fee-records/class/{classId}/month/{month} - Get records by class and month
PUT    /fee-records/{id}/mark-paid      - Mark fee as paid
PUT    /fee-records/{id}/mark-unpaid    - Mark fee as unpaid
```

### Classes
```
GET    /classes                 - Get all classes
GET    /classes/{id}            - Get class by ID
```

### Dashboard
```
GET    /dashboard/admin         - Get admin dashboard
GET    /dashboard/finance       - Get finance dashboard
```

### Reports
```
GET    /reports/monthly         - Get monthly report
GET    /reports/class-wise-monthly - Get class-wise report
```

## 🌐 Deployment

### Deploying Backend on Render

1. **Create a new Web Service on Render**
   - GitHub repository: Select your repo
   - Branch: `main`
   - Build command: `mvn clean package -DskipTests`
   - Start command: `java -jar target/school-management-backend-1.0.0.jar`

2. **Environment Variables on Render:**
   ```
   DATABASE_URL=postgresql://user:password@host:port/dbname
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   JWT_SECRET=your-secure-random-jwt-secret-key-min-64-chars
   SPRING_PROFILES_ACTIVE=prod
   ```

3. **PostgreSQL Database**
   - Create a PostgreSQL database on Render or use external provider

### Deploying Frontend on Netlify

1. **Connect GitHub Repository**
   - New site from Git
   - Select your repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`

3. **Environment Variables**
   ```
   REACT_APP_API_BASE_URL=https://your-render-backend-url/api
   REACT_APP_ENV=production
   ```

4. **Deploy**
   - Netlify will automatically build and deploy on every push

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📊 Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - Admin and Finance users
- `classes` - School classes (1-10)
- `students` - Student records
- `fee_structures` - Fee rates per class and student type
- `fee_records` - Monthly fee tracking

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password encryption
- **Role-Based Access Control**: Different permissions for Admin and Finance roles
- **CORS Configuration**: Secure cross-origin requests
- **Input Validation**: Server-side validation of all inputs
- **SQL Injection Prevention**: Using JPA parameterized queries

## 📱 Responsive Design

The application is fully responsive and works on:
- ✅ Desktop (1920x1080 and above)
- ✅ Tablet (768px to 1024px)
- ✅ Mobile (320px to 767px)

## 📄 Environment Variables

### Frontend (.env)
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_ENV=development
```

### Backend (application.yml)
```
DATABASE_URL=jdbc:postgresql://localhost:5432/school_management
JWT_SECRET=your-secret-key-change-this-in-production
```

## 🐛 Known Issues & Limitations

None currently. All features as per SRS are implemented.

## 📞 Support

For issues and questions, please create an issue in the GitHub repository.

## 📄 License

This project is provided as-is for educational purposes.

## 👨‍💻 Developer Notes

### Adding a New Feature

1. **Backend**:
   - Create entity in `entity` folder
   - Create repository in `repository` folder
   - Create service in `service` folder
   - Create controller in `controller` folder
   - Add DTO if needed in `dto` folder

2. **Frontend**:
   - Create component in `components` or `pages` folder
   - Add API calls in `services/api.js`
   - Create styles in `styles` folder
   - Add routing in `App.js`

### Code Style

- Follow Java naming conventions for backend
- Use ES6+ for frontend code
- Use meaningful variable and function names
- Add comments for complex logic

### Git Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add feature description"`
3. Push to branch: `git push origin feature/your-feature`
4. Create a Pull Request

## 🎯 Future Enhancements

- Email notifications for fee reminders
- SMS alerts for parents
- Student performance tracking
- Attendance management
- Online fee payment integration
- Advanced reporting with PDF/CSV export
- Mobile app for parents
- Real-time notifications

---

**Version**: 1.0.0  
**Last Updated**: September 2026 
**Maintainer**: Md Zishan
