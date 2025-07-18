# DailyWageConnect Backend API

A robust backend API for DailyWageConnect - a local job scheduler platform that connects households with daily-wage workers including electricians, plumbers, house cleaners, gardeners, and more.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Customer/Worker)
  - Password hashing with bcrypt
  - Refresh token support

- **Worker Management**
  - Complete worker profiles with skills and services
  - Rating and review system
  - Verification status tracking
  - Advanced search and filtering

- **Security**
  - Helmet.js for security headers
  - CORS protection
  - Rate limiting
  - Input validation with express-validator

- **Database**
  - MongoDB with Mongoose ODM
  - Optimized queries with indexes
  - Data validation and schemas

## 📋 Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)
- MongoDB (local or Atlas)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dailywage-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/dailywage-connect
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## 🚦 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Seed Demo Data
```bash
npm run seed
```

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register           - Register new user
POST   /api/auth/login              - Login user
POST   /api/auth/refresh-token      - Refresh JWT token
GET    /api/auth/me                 - Get current user
POST   /api/auth/logout             - Logout user
POST   /api/auth/forgot-password    - Request password reset
POST   /api/auth/reset-password     - Reset password
POST   /api/auth/change-password    - Change password (authenticated)
```

### Workers
```
GET    /api/workers                 - Get all workers (with filters)
GET    /api/workers/top-rated       - Get top rated workers
GET    /api/workers/search          - Search workers
GET    /api/workers/service/:service - Get workers by service
GET    /api/workers/:id             - Get worker by ID
GET    /api/workers/me/profile      - Get my worker profile (worker only)
PUT    /api/workers/me/profile      - Update worker profile (worker only)
GET    /api/workers/me/stats        - Get worker statistics (worker only)
```

### Health Check
```
GET    /health                      - Server health status
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🎯 Demo Accounts

After running the seed script, you can use these demo accounts:

**Customer Account:**
- Email: `customer@demo.com`
- Password: `Demo123!`

**Worker Accounts:**
- Email: `ramesh@demo.com` (Electrician)
- Email: `suresh@demo.com` (Plumber)
- Email: `maya@demo.com` (Cleaner & Gardener)
- Email: `rajesh@demo.com` (Painter & Carpenter)
- Email: `anita@demo.com` (House Cleaner)
- Email: `vikram@demo.com` (Appliance Repair)
- Password: `Demo123!` (for all workers)

## 📊 API Response Format

All API responses follow this consistent format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 12,
    "totalPages": 5
  }
}
```

## 🔍 Query Parameters

### Workers Endpoint (`/api/workers`)

| Parameter | Type | Description |
|-----------|------|-------------|
| `services` | Array | Filter by service types |
| `location` | String | Filter by location |
| `minPrice` | Number | Minimum hourly rate |
| `maxPrice` | Number | Maximum hourly rate |
| `rating` | Number | Minimum rating |
| `experience` | Number | Minimum experience years |
| `verifiedOnly` | Boolean | Show only verified workers |
| `page` | Number | Page number (default: 1) |
| `limit` | Number | Results per page (default: 12) |
| `sort` | String | Sort field (rating, experience, hourlyRate) |
| `order` | String | Sort order (asc, desc) |

## 🏗️ Project Structure

```
src/
├── config/          # Configuration files
│   └── database.ts  # Database connection
├── controllers/     # Route controllers
│   ├── authController.ts
│   └── workerController.ts
├── middleware/      # Custom middleware
│   ├── auth.ts      # Authentication middleware
│   └── validation.ts # Validation middleware
├── models/          # Mongoose models
│   ├── User.ts
│   ├── Worker.ts
│   └── Booking.ts
├── routes/          # Route definitions
│   ├── auth.ts
│   └── workers.ts
├── seeds/           # Database seed scripts
│   └── seedData.ts
├── types/           # TypeScript types
│   └── index.ts
└── server.ts        # Main application file
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Lint code
npm run lint

# Type checking
npm run build
```

## 🔧 Development Tools

- **TypeScript** - Type safety
- **Nodemon** - Hot reloading
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📦 Built With

- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **Rate Limiting** - API protection
- **Morgan** - HTTP logging
- **Compression** - Response compression

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dailywage-connect
JWT_SECRET=your-super-secure-production-secret
FRONTEND_URL=https://your-frontend-domain.com
```

### Docker (Optional)

```dockerfile
# Dockerfile example
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@dailywageconnect.com or create an issue on GitHub.

## 🗺️ Roadmap

- [ ] Booking system implementation
- [ ] Payment gateway integration
- [ ] Real-time notifications
- [ ] Tool rental system
- [ ] Mobile app API support
- [ ] Admin dashboard APIs
- [ ] Analytics and reporting
- [ ] SMS notifications
- [ ] File upload for worker documents
- [ ] Geolocation services

## ⚡ Performance

- Database queries optimized with indexes
- Response compression enabled
- Rate limiting implemented
- Efficient pagination
- Optimized aggregation pipelines

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Helmet security headers
- Input validation and sanitization
- Rate limiting
- SQL injection prevention
- XSS protection

---

Made with ❤️ for empowering daily-wage workers and providing digital inclusion.