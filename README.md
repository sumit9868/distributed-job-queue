# Job Management System

A full-stack web application for managing and monitoring job submissions with real-time status updates using Server-Sent Events (SSE).

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Job Submission**: Submit jobs with title and description
- **Real-time Dashboard**: Live job status updates using SSE streaming
- **Job Status Tracking**: Monitor job progress (PENDING, RUNNING, DONE, FAILED)
- **Statistics Overview**: Visual summary of job completion rates
- **Responsive Design**: Modern UI that works on desktop and mobile

## 🛠️ Tech Stack

### Backend
- **Java 17+**
- **Spring Boot 3.x**
  - Spring Web
  - Spring Security
  - Spring Data JPA
  - Spring Validation
- **H2 Database** (in-memory for development)
- **Maven** for dependency management

### Frontend
- **React 18+**
- **React Router** for navigation
- **Axios** for HTTP requests
- **Server-Sent Events (SSE)** for real-time updates
- **CSS3** for styling

## 📋 Prerequisites

Before running this application, make sure you have:

- **Java JDK 17 or higher** - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 16+ and npm** - [Download](https://nodejs.org/)
- **Maven 3.6+** (or use the included Maven wrapper)
- **Git** - [Download](https://git-scm.com/)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd <repository-name>
```

### 2. Backend Setup (Spring Boot)
```bash
# Navigate to backend directory
cd backend

# Install dependencies and build
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

The backend server will start at `http://localhost:8080`

**Default Configuration:**
- Port: `8080`
- Database: H2 (in-memory)
- H2 Console: `http://localhost:8080/h2-console`

### 3. Frontend Setup (React)
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend application will start at `http://localhost:3000`

## 📁 Project Structure
```
job-management-system/
├── backend/                    # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/yourpackage/
│   │   │   │       ├── config/          # Security & CORS config
│   │   │   │       ├── controller/      # REST controllers
│   │   │   │       ├── model/           # Entity classes
│   │   │   │       ├── repository/      # JPA repositories
│   │   │   │       └── service/         # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
├── frontend/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── JobDashboard.js      # Real-time dashboard
│   │   │   ├── JobForm.js           # Job submission form
│   │   │   ├── JobStatus.js         # Job status checker
│   │   │   ├── LoginPage.js         # Login component
│   │   │   ├── RegisterPage.js      # Registration component
│   │   │   └── LandingPage.js       # Landing page
│   │   ├── style/
│   │   │   └── JobDashboard.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/verify` - Verify session
- `POST /auth/logout` - User logout

### Jobs
- `POST /jobs` - Submit a new job
- `GET /jobs/{id}` - Get job by ID
- `GET /jobs/user` - Get all jobs for current user
- `GET /jobs/stream` - SSE stream for real-time job updates

## 🎯 Usage

### 1. Register/Login
- Navigate to `http://localhost:3000`
- Click "Register" to create a new account
- Login with your credentials

### 2. Submit a Job
- Go to "Submit Job" from the navigation
- Enter job title and description
- Click submit

### 3. Monitor Jobs
- Navigate to "Dashboard" to see all your jobs
- Jobs update in real-time as their status changes
- View statistics: Total, Completed, Failed, Pending

### 4. Check Job Status
- Go to "Check Status"
- Enter a job ID to view its details

## ⚙️ Configuration

### Backend Configuration (`application.properties`)
```properties
# Server
server.port=8080

# H2 Database
spring.datasource.url=jdbc:h2:mem:jobdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

### Frontend Configuration

Update API URL in components if backend runs on different port:
```javascript
const API_URL = "http://localhost:8080";
```

## 🚧 Development

### Running in Development Mode

**Backend with hot reload:**
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend with hot reload:**
```bash
cd frontend
npm start
```

### Building for Production

**Backend:**
```bash
cd backend
./mvnw clean package
java -jar target/your-app-name.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

## 🔒 Security Features

- HTTP Basic Authentication
- Password encryption using BCrypt
- CORS configuration for cross-origin requests
- Session-based authentication
- Protected routes and endpoints
- Credentials sent with requests (`withCredentials: true`)

## 🐛 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change port in application.properties
server.port=8081
```

**Database connection errors:**
- Check H2 console at `http://localhost:8080/h2-console`
- Verify JDBC URL: `jdbc:h2:mem:jobdb`

### Frontend Issues

**CORS errors:**
- Verify backend CORS configuration allows `http://localhost:3000`
- Check that `withCredentials: true` is set in axios calls

**SSE not receiving updates:**
- Check Network tab for `/jobs/stream` connection
- Verify event listener matches backend event name (`job-update`)
- Check browser console for errors

**Login redirects to login page after refresh:**
- Clear localStorage and try logging in again
- Check backend session configuration

## 📝 Future Enhancements

- [ ] Job scheduling and retry mechanism
- [ ] Email notifications for job completion
- [ ] Job filtering and search
- [ ] User profile management
- [ ] Job priority levels
- [ ] Export job history to CSV
- [ ] Admin dashboard
- [ ] PostgreSQL/MySQL for production
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Your Name - [Your Email/GitHub]

## 🙏 Acknowledgments

- Spring Boot documentation
- React documentation
- Server-Sent Events (SSE) specification
- Community tutorials and resources