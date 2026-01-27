# Job Management System - Frontend

React-based frontend application with real-time job status updates using Server-Sent Events.

## 🛠️ Tech Stack

- **React** 18.x
- **React Router** 6.x - Client-side routing
- **Axios** - HTTP client
- **Server-Sent Events (SSE)** - Real-time updates
- **CSS3** - Custom styling

## 📋 Prerequisites

- **Node.js** 16+ and npm 8+
- **Backend API** running on `http://localhost:8080`

## 🚀 Quick Start

### Installation
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

Create `.env` file in the frontend root:
```env
REACT_APP_API_URL=http://localhost:8080
```

### API Endpoints

The app connects to these backend endpoints:
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/verify` - Verify session
- `POST /jobs` - Submit new job
- `GET /jobs/{id}` - Get job by ID
- `GET /jobs/user` - Get user's jobs
- `GET /jobs/stream` - SSE stream for real-time updates

## 📁 Project Structure
```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── Components/
│   │   ├── LandingPage.js      # Home page
│   │   ├── LoginPage.js        # User login
│   │   ├── RegisterPage.js     # User registration
│   │   ├── JobDashboard.js     # Real-time dashboard
│   │   ├── JobForm.js          # Job submission
│   │   └── JobStatus.js        # Check job status
│   ├── style/
│   │   └── JobDashboard.css    # Dashboard styles
│   ├── App.js                  # Main app with routing
│   ├── App.css                 # Global styles
│   └── index.js                # Entry point
├── .env
├── package.json
└── README.md
```

## 🧩 Components Overview

### LandingPage
Landing page with app introduction and login/register buttons.

### LoginPage
- Username/password authentication
- Error handling
- Redirects to dashboard on success
- Persistent sessions via localStorage

**Props**: `onLogin` (callback function)

### RegisterPage
- New user registration
- Form validation
- Redirects to login after success

### JobDashboard
- **Real-time updates** via SSE
- Statistics cards (Total, Completed, Failed, Pending)
- Job table with color-coded status badges
- Connection status indicator

### JobForm
Submit new jobs with title and description.

### JobStatus
Check status of a specific job by ID.

## 🛣️ Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/` | LandingPage | Public |
| `/login` | LoginPage | Public |
| `/register` | RegisterPage | Public |
| `/dashboard` | JobDashboard | Protected |
| `/submit` | JobForm | Protected |
| `/status` | JobStatus | Protected |

Protected routes redirect to `/login` if not authenticated.

## 💾 Authentication

Authentication state persists using localStorage:
```javascript
// Stored on login
localStorage.setItem('isLoggedIn', 'true');

// Checked on app load
const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem('isLoggedIn') === 'true';
});
```

## 🎨 Styling

- **App.css** - Global styles, navigation, forms
- **JobDashboard.css** - Dashboard-specific styles
- **Inline styles** - Component-specific (LandingPage)

Color scheme:
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Violet)
- Success: `#15803d` (Green)
- Error: `#dc2626` (Red)
- Warning: `#d97706` (Orange)

## 📡 Server-Sent Events (SSE)

Real-time job updates in `JobDashboard.js`:
```javascript
const eventSource = new EventSource(
  "http://localhost:8080/jobs/stream",
  { withCredentials: true }
);

// Listen for 'job-update' events
eventSource.addEventListener("job-update", (event) => {
  const jobs = JSON.parse(event.data);
  setJobs(jobs);
});

// Cleanup on unmount
return () => eventSource.close();
```

## 🏗️ Build & Deploy

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

Output in `build/` directory.

### Serve Production Build
```bash
npm install -g serve
serve -s build -p 3000
```

### Docker Deployment
```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
```bash
docker build -t job-frontend .
docker run -p 3000:80 job-frontend
```

## 🧪 Testing
```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

## 🐛 Troubleshooting

### CORS Errors
**Issue**: API requests blocked by CORS

**Fix**:
- Verify backend CORS allows `http://localhost:3000`
- Ensure `withCredentials: true` in requests
- Check backend security configuration

### SSE Not Receiving Data
**Issue**: Connection open but no updates

**Fix**:
- Check event name matches backend (`job-update`)
- Inspect Network tab → EventStream messages
- Verify backend is sending events

### Login Loop (Redirects to Login After Refresh)
**Issue**: Session lost on page reload

**Fix**:
- Check localStorage has `isLoggedIn` key
- Clear localStorage: `localStorage.clear()`
- Re-login

### Port Already in Use
**Issue**: `Port 3000 is already in use`

**Fix**:
```bash
# Use different port
PORT=3001 npm start

# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9  # Mac/Linux
```

### Build Failures
**Issue**: `npm run build` fails

**Fix**:
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📦 Key Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0"
  }
}
```

## 🔐 Security Notes

- Never commit `.env` files
- Use HTTPS in production
- Validate user input
- Keep dependencies updated: `npm audit fix`
- Sanitize data before rendering

## 📱 Responsive Design

Breakpoints:
- Mobile: `< 768px`
- Tablet: `768px - 1366px`
- Desktop: `> 1366px`

## 📚 Resources

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## 📄 License

MIT License