# DailyWageConnect - Local Job Scheduler for Daily-Wage Workers

![DailyWageConnect](https://img.shields.io/badge/Status-Development-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-teal)

DailyWageConnect is a lightweight, user-friendly platform that connects households with nearby daily-wage workers like electricians, plumbers, maids, and gardeners. It enables scheduling jobs based on mutual availability, helping workers get consistent income and users find reliable help easily.

## 🎯 Project Overview

### Objectives
- **Digitally connect** informal workers with local households
- **Enable two-way scheduling** (workers & users set availability)
- **Empower unskilled/low-income workers** via simple tech
- **Reduce dependency** on middlemen

### Social Relevance
- Empowers workers with job access and scheduling control
- Builds trust between users and local workers
- Promotes digital inclusion for low-tech communities
- Supports women, elderly, and low-income households
- Reduces worker exploitation and improves quality of life

### Financial Relevance
- Ensures steady, direct income for workers
- Removes middleman/broker fees
- Saves time and money for users
- Promotes local economic circulation
- Opens doors for future financial services (wallets, loans, etc.)

## 🛠️ Tech Stack

### Frontend
- **React.js** with TypeScript - Modern UI framework
- **Tailwind CSS** - Fast and responsive styling
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Heroicons** - Beautiful icons
- **React Hot Toast** - Notifications
- **Date-fns** - Date manipulation

### Backend (Planned)
- **Node.js + Express.js** - REST APIs
- **MongoDB/PostgreSQL** - Database
- **Firebase** (optional) - Authentication & real-time features
- **Python** (optional) - ML/AI features

### Tools & Utilities
- **Figma** - UI/UX design
- **GitHub** - Version control
- **Vercel/Netlify** - Frontend deployment

## ✨ Key Features

### User Side
- ✅ Search & browse available workers by category
- ✅ View worker profiles, ratings, and availability
- 🔄 Schedule work based on date/time (Coming Soon)
- 🔄 Notification/alert system (Coming Soon)
- 🔄 Feedback system (Coming Soon)
- 🔄 Browse tools and book rentals (Coming Soon)

### Worker Side
- 🔄 Create and update profile (Coming Soon)
- 🔄 Set daily/weekly availability (Coming Soon)
- 🔄 Accept or reject job requests (Coming Soon)
- 🔄 View schedule and earnings summary (Coming Soon)
- 🔄 Get job alerts (Coming Soon)
- 🔄 List tools for rental (Coming Soon)

### Current MVP Features
- ✅ Modern responsive homepage
- ✅ Worker discovery and search
- ✅ User authentication system
- ✅ Profile management basics
- ✅ Service categorization
- ✅ Rating and review display

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dailywage-connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Demo Accounts
- **Customer Demo**: Use "Demo Customer" button on login page
- **Worker Demo**: Use "Demo Worker" button on login page

## 📱 Pages & Features

### Public Pages
- **Homepage** (`/`) - Landing page with features and testimonials
- **Find Workers** (`/workers`) - Search and browse workers
- **Browse Tools** (`/tools`) - Tool rental marketplace (Coming Soon)
- **Login** (`/login`) - User authentication

### Protected Pages (Require Login)
- **My Bookings** (`/bookings`) - Manage service bookings
- **Profile** (`/profile`) - User profile management

### Worker Pages (Worker Account Required)
- **Dashboard** (`/worker/dashboard`) - Worker management interface

## 🎨 Design System

### Colors
- **Primary**: Blue shades for main actions and branding
- **Secondary**: Purple shades for accents
- **Success**: Green for positive actions
- **Warning**: Yellow for cautions
- **Error**: Red for errors

### Components
- **Buttons**: Primary, secondary, success, warning, error variants
- **Cards**: Base card with hover effects
- **Forms**: Consistent input styling with validation
- **Navigation**: Responsive header with user/worker specific menus

## 📂 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout/         # Layout components (Header, Footer, etc.)
│   └── ProtectedRoute.tsx
├── context/            # React context for state management
│   └── AppContext.tsx
├── pages/              # Page components
│   ├── auth/          # Authentication pages
│   ├── worker/        # Worker-specific pages
│   └── ...
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Main app component
└── index.tsx          # App entry point
```

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🌟 Future Enhancements

### Phase 2 Features
- **Multilingual interface** - Support for local languages
- **Wallet/payment tracking** - Integrated payment system
- **Geo-location matching** - Location-based worker discovery
- **Smart recommendations** - AI-powered suggestions
- **Trust rating & verification** - Enhanced safety features

### Phase 3 Features
- **Mobile app** (React Native/Flutter)
- **WhatsApp integration** - Chat and voice interface
- **Advanced analytics** - Earnings and performance tracking
- **Community features** - Worker forums and support

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines and code of conduct.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

- **Email**: support@dailywageconnect.com
- **Issues**: [GitHub Issues](https://github.com/your-org/dailywage-connect/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/dailywage-connect/discussions)

## 🙏 Acknowledgments

- Icons by [Heroicons](https://heroicons.com/)
- UI components inspired by [Tailwind UI](https://tailwindui.com/)
- Created with [Create React App](https://create-react-app.dev/)

---

**Made with ❤️ for empowering daily-wage workers and connecting communities**
