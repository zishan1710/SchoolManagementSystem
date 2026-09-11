# 🚀 Getting Started Guide

Welcome to the School Management Application! This guide will help you get up and running quickly.

## ✅ What's Included

Your project includes:
- **Complete Spring Boot 3.9 Backend** with Java 21
- **Full React.js Frontend** with modern UI/UX
- **PostgreSQL Database** setup
- **Docker & Docker Compose** configurations
- **Comprehensive Documentation** and deployment guides
- **Build Scripts** for easy development

## 📋 Quick Start (5 minutes)

### Option 1: Using Docker Compose (Easiest)

```bash
# Navigate to project directory
cd school-management-app

# Build and start everything
docker-compose up --build

# Access the application
Frontend:  http://localhost:3000
Backend:   http://localhost:8080/api
Database:  localhost:5432
```

**Demo Credentials:**
- Admin: `admin@school.com` / `admin123`
- Finance: `finance@school.com` / `finance123`

### Option 2: Local Development

#### Prerequisites
- Java 21+ installed
- Node.js 18+ installed
- PostgreSQL 12+ running on localhost:5432
  - Database: `school_management`
  - User: `postgres`
  - Password: `postgres`

#### Setup Backend
```bash
cd school-management-app/backend

# Run Spring Boot application
mvn spring-boot:run
```
Backend will start on http://localhost:8080/api

#### Setup Frontend (New Terminal)
```bash
cd school-management-app/frontend

# Install dependencies
npm install

# Start development server
npm start
```
Frontend will start on http://localhost:3000

### Option 3: Using Build Scripts

#### On macOS/Linux:
```bash
cd school-management-app
chmod +x build.sh
./build.sh
# Follow the menu
```

#### On Windows:
```cmd
cd school-management-app
build.bat
# Follow the menu
```

---

## 🏗️ Project Structure Overview

```
school-management-app/
├── frontend/              # React.js application
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── styles/       # CSS stylesheets
│   ├── Dockerfile        # Docker config
│   └── package.json      # Dependencies
├── backend/              # Spring Boot application
│   ├── src/main/java/    # Java source code
│   ├── src/main/resources/ # Configuration files
│   ├── pom.xml           # Maven dependencies
│   └── Dockerfile        # Docker config
├── docker-compose.yml    # Local development setup
├── README.md             # Full documentation
├── DEPLOYMENT.md         # Deployment guide
├── build.sh              # Linux/Mac build script
└── build.bat             # Windows build script
```

---

## 📚 Key Features

### Public Website
- Modern, responsive landing page
- School information showcase
- Contact section with social links
- Professional UI design

### Admin Dashboard
- Student management (Create, Read, Update, Delete)
- Search and filter students
- Finance user management
- Fee overview
- Monthly reports

### Finance Dashboard
- Fee management interface
- Mark fees as paid/unpaid
- Advanced filtering
- Monthly and class-wise reports

### Security
- JWT authentication
- Bcrypt password hashing
- Role-based access control
- CORS protection

---

## 🔐 Default Demo Accounts

```
Admin User:
Email: admin@school.com
Password: admin123

Finance User:
Email: finance@school.com
Password: finance123
```

⚠️ **Change these credentials before production deployment!**

---

## 📱 Application Flows

### Admin Workflow
1. Login → Dashboard → Manage Students → Manage Finance Users → View Fees → Generate Reports

### Finance Workflow
1. Login → Dashboard → View Student Fees → Mark Payments → Generate Reports

### Public User Workflow
1. View Website → Explore Features → Login (if Admin/Finance)

---

## 🔧 Configuration Files

### Frontend
- `.env.example` → Environment variables template
- `package.json` → Dependencies

### Backend
- `application.yml` → Development configuration
- `application-prod.yml` → Production configuration
- `pom.xml` → Maven dependencies

---

## 📊 Database Schema

The application creates these tables:
- **users** - Admin and Finance users
- **classes** - School classes (1-10)
- **students** - Student records
- **fee_structures** - Fee rates per class and student type
- **fee_records** - Monthly fee tracking

All created automatically on first run!

---

## 🌐 API Endpoints

Key endpoints (all require JWT token):

```
Authentication:
POST   /auth/login

Students:
GET    /students
POST   /students
PUT    /students/{id}
DELETE /students/{id}

Fees:
POST   /fee-records/create
GET    /fee-records
PUT    /fee-records/{id}/mark-paid

Reports:
GET    /reports/monthly
GET    /reports/class-wise-monthly

Dashboard:
GET    /dashboard/admin
GET    /dashboard/finance
```

---

## 🐛 Common Issues & Solutions

### Issue: "Connection refused" to PostgreSQL
**Solution**: Ensure PostgreSQL is running
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows - Use PostgreSQL application
```

### Issue: Port 8080 already in use
**Solution**: Change port in `application.yml`:
```yaml
server:
  port: 8081  # Change to any available port
```

### Issue: npm install fails
**Solution**: Clear cache and reinstall
```bash
cd frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Frontend can't connect to backend
**Solution**: Check `.env` file:
```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

---

## 📦 Building for Production

### Backend
```bash
cd backend
mvn clean package -DskipTests
# JAR file: target/school-management-backend-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
# Build files: build/
```

---

## 🚀 Deployment

### Quick Deploy to Netlify (Frontend)
1. Push to GitHub
2. Connect repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variables

### Quick Deploy to Render (Backend)
1. Create PostgreSQL database
2. Create Web Service
3. Connect GitHub repo
4. Set environment variables
5. Deploy

See `DEPLOYMENT.md` for detailed instructions.

---

## 📖 Next Steps

1. **Explore the Code**
   - Review `frontend/src/App.js`
   - Review `backend/src/main/java/com/school/SchoolManagementApplication.java`

2. **Customize**
   - Update school name in `PublicWebsite.js`
   - Modify fee structure in database
   - Add your school logo

3. **Deploy**
   - Follow `DEPLOYMENT.md`
   - Deploy to Render (Backend)
   - Deploy to Netlify (Frontend)

4. **Monitor**
   - Check logs regularly
   - Monitor performance
   - Update dependencies

---

## 📞 Support & Help

### Resources
- Full documentation: `README.md`
- Deployment guide: `DEPLOYMENT.md`
- API documentation in comments throughout code

### Common Commands

```bash
# Start everything with Docker
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean up Docker
docker-compose down -v
```

---

## ✨ Features Implemented (as per SRS)

✅ Public website with all required sections
✅ Admin dashboard with student management
✅ Finance dashboard with fee management
✅ Authentication and role-based access
✅ Student CRUD operations
✅ Finance user management
✅ Fee structure (₹500 Day Scholar, ₹300 Hostler)
✅ Monthly fee records
✅ Payment status tracking
✅ Filtering and search
✅ Monthly reports with class-wise summary
✅ 50+ seeded students
✅ 10 classes
✅ Responsive design
✅ Security with JWT and Bcrypt
✅ Database with PostgreSQL
✅ REST APIs
✅ Deployment configurations

---

## 🎯 What to Do First

1. **Extract the ZIP file**
   ```bash
   unzip school-management-app.zip
   cd school-management-app
   ```

2. **Run with Docker** (easiest)
   ```bash
   docker-compose up --build
   ```

3. **Login with demo credentials**
   - Admin: admin@school.com / admin123
   - Finance: finance@school.com / finance123

4. **Explore the application**
   - Try adding students
   - Manage fees
   - Generate reports

5. **Read documentation**
   - Open README.md for full details
   - Open DEPLOYMENT.md for deployment steps

---

## 📊 Tech Stack Summary

| Component | Technology | Version |
|-----------|-----------|---------|
| Frontend | React.js | 18.2.0 |
| Backend | Spring Boot | 3.3.0 |
| Java | OpenJDK | 21 |
| Database | PostgreSQL | 15 |
| Authentication | JWT | 0.12.3 |
| Build | Maven | 3.9.0 |
| Container | Docker | Latest |

---

**Happy Coding! 🎉**

For more detailed information, please refer to the README.md and DEPLOYMENT.md files.
