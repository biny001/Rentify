# 🚗 Rentify - Car Rental Landing Page

A modern, responsive car rental landing page built with React and Vite. This project provides a seamless car booking experience with user authentication, payment integration, and a comprehensive vehicle catalog.

![Rentify Hero](src/images/hero/main-car.png)

## ✨ Features

- **🚀 Modern UI/UX** - Beautiful, responsive design with smooth animations
- **🔐 User Authentication** - Secure login and signup functionality
- **🚗 Vehicle Catalog** - Browse and search through available cars
- **📅 Booking System** - Easy date and time selection for rentals
- **💳 Payment Integration** - PayPal payment processing
- **📊 User Dashboard** - Manage bookings and view rental history
- **📱 Responsive Design** - Works perfectly on all devices
- **🔍 Search Functionality** - Find cars by model or brand
- **⭐ Testimonials** - Customer reviews and feedback
- **📞 Contact Information** - Easy communication channels

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and functional components
- **Vite 4.2.0** - Fast build tool and development server
- **React Router DOM 6.8.0** - Client-side routing
- **Redux Toolkit 1.9.3** - State management
- **React Redux 8.0.5** - React bindings for Redux

### UI/Styling
- **Tailwind CSS 3.2.7** - Utility-first CSS framework
- **Material-UI 5.11.13** - React component library
- **@emotion/react & @emotion/styled** - CSS-in-JS styling
- **Material Icons** - Icon library

### Payment & Integration
- **PayPal React JS 7.8.2** - PayPal payment integration
- **Braintree 3.13.0** - Payment processing
- **Axios 1.3.4** - HTTP client for API calls

### Additional Libraries
- **React Datepicker 4.10.0** - Date selection component
- **Recharts 2.5.0** - Chart library for analytics
- **RC Table 7.31.1** - Table component
- **RC Progress 3.4.1** - Progress indicators

### Development Tools
- **PostCSS 8.4.21** - CSS processing
- **Autoprefixer 10.4.14** - CSS vendor prefixing
- **ESLint** - Code linting
- **Testing Library** - Component testing

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client
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
   Navigate to `http://localhost:4000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── Hero.jsx        # Hero section
│   ├── Footer.jsx      # Footer component
│   ├── Login.jsx       # Login form
│   ├── Signup.jsx      # Signup form
│   └── ...
├── Pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── Models.jsx      # Car catalog page
│   ├── About.jsx       # About page
│   ├── UserDashboard.jsx # User dashboard
│   └── ...
├── features/           # Redux slices and API
├── images/            # Static images and assets
│   ├── hero/          # Hero section images
│   ├── banners/       # Banner images
│   ├── about/         # About page images
│   └── ...
└── dist/              # Compiled styles
```

## 🎨 Key Components

### Hero Section
![Hero Background](src/images/hero/heroes-bg.png)

### Car Models
The application features a comprehensive car catalog with:
- High-quality car images
- Detailed specifications (transmission, fuel type, doors, AC)
- Real-time availability status
- Pricing information
- Booking functionality

### User Dashboard
- Booking management
- Rental history
- User profile settings
- Payment tracking

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### API Integration
The application connects to a backend API for:
- User authentication
- Car data management
- Booking operations
- Payment processing

## 🚗 Car Features

The rental system includes various car types with detailed specifications:

- **Vehicle Models** - Multiple car brands and models
- **Transmission Types** - Manual and Automatic options
- **Fuel Types** - Gasoline, Diesel, Electric, Hybrid
- **Door Configurations** - 2-door, 4-door, 5-door options
- **AC Availability** - Climate control options
- **Pricing** - Daily rental rates
- **Availability Status** - Real-time booking status

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📦 Build and Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development** - React, Vite, Tailwind CSS
- **Backend Integration** - RESTful API
- **Payment Processing** - PayPal, Braintree
- **UI/UX Design** - Material-UI, Custom Components

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Rentify** - Making car rentals simple and accessible! 🚗✨ 