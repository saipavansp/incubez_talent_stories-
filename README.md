# INCUBEZ Talent Stories

🎥 A modern, video-based talent marketplace connecting startup founders with co-founders, EIRs, and key talent through video pitches.

**Live Demo**: [Coming Soon]  
**GitHub**: https://github.com/saipavansp/incubez_talent_stories-.git

---

## 🚀 Features

### For Founders
- Multi-step form to post job pitches
- Video upload for pitch presentation
- Structured position details
- Payment integration for posting

### For Seekers
- Comprehensive application form
- Video application with guided prompts
- Preference settings for ideal matches
- Portfolio and experience showcase

### General Features
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Video recording and upload capabilities
- Form data persistence
- Modern UI/UX with INCUBEZ branding

## 🛠️ Tech Stack

- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
incubez/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── common/       # Shared components
│   │   │   ├── forms/        # Form components
│   │   │   ├── home/         # Homepage components
│   │   │   ├── layout/       # Layout components
│   │   │   └── payment/      # Payment components
│   │   ├── pages/            # Page components
│   │   ├── styles/           # Global styles
│   │   └── App.jsx           # Main app component
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Custom middleware
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   └── utils/            # Utility functions
│   └── server.js             # Express server
└── package.json              # Root package file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for backend)
- Google Cloud account (for Drive & Sheets API)
- Razorpay account (for payments)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/incubez/talent-stories.git
cd incubez
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/incubez-talent
JWT_SECRET=your_jwt_secret
GOOGLE_DRIVE_CLIENT_EMAIL=your_service_account_email
GOOGLE_DRIVE_PRIVATE_KEY=your_private_key
GOOGLE_DRIVE_FOLDER_ID=your_folder_id
GOOGLE_SHEETS_ID=your_sheets_id
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLIENT_URL=http://localhost:3000
```

Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY=your_razorpay_key
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

3. Or run both concurrently from root:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🎨 Design System

### Colors
- Primary Red: `#e14f46`
- Primary Black: `#000000`
- Gray Scale: Custom gray palette

### Typography
- Font Family: Inter
- Headings: Bold weight
- Body: Regular weight

### Components
- Buttons: Primary, Secondary, Outline variants
- Forms: Consistent input styling
- Cards: Shadow and hover effects
- Animations: Smooth transitions

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+
- Large Desktop: 1440px+

## 🔒 Security Features

- Input validation and sanitization
- File type and size restrictions
- Secure payment handling
- CORS configuration
- Rate limiting (to be implemented)
- JWT authentication (to be implemented)

## 🚧 Pending Features

- Backend API implementation
- Google Drive integration
- Google Sheets integration
- Payment gateway integration
- Email notifications
- Admin dashboard
- Search and filter functionality
- User authentication
- Video compression

## 📝 API Endpoints

### Founder Endpoints
- `POST /api/founders/pitch` - Submit founder pitch
- `POST /api/founders/upload-video` - Upload pitch video
- `GET /api/founders/pitch/:id` - Get pitch details

### Seeker Endpoints
- `POST /api/seekers/application` - Submit application
- `POST /api/seekers/upload-video` - Upload application video
- `GET /api/seekers/application/:id` - Get application details

### Payment Endpoints
- `POST /api/payment/create-order` - Create payment order
- `POST /api/payment/verify` - Verify payment
- `GET /api/payment/status/:orderId` - Check payment status

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by INCUBEZ.

## 📞 Support

For support, email support@incubez.com or contact us through the website.
