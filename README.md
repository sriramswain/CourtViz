# CourtViz.io 🏀

**Changing the way film is analyzed in basketball.**

CourtViz is a comprehensive basketball analytics platform that leverages AI-powered computer vision to revolutionize how coaches and players analyze game footage and track performance metrics.

## 🚀 Features

### For Coaches
- **Team Management Dashboard** - Oversee player development and assign training objectives
- **Video Upload & Analysis** - Upload game footage for AI-powered analysis
- **Raw Film Library** - Organize and manage game footage
- **CV Tagged Film** - Access AI-analyzed plays with detailed metrics
- **Performance Analytics** - Track team and individual player progress

### For Players
- **Personal Dashboard** - View individual performance metrics and goals
- **Progress Tracking** - Monitor skill development and goal achievement
- **Film Library Access** - Review tagged plays and personal highlights
- **Goal Setting** - Set and track personal development objectives
- **Performance Insights** - Detailed analytics on play efficacy and trends

### AI-Powered Analysis
- **Automated Play Detection** - AI identifies every play with specific action, end result, and timestamp
- **Play Efficacy Analysis** - Calculates effectiveness in transition vs half-court sets
- **Player Recognition** - Computer vision models detect and track individual players
- **Action Classification** - Categorizes plays using advanced ML models

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Custom UI Components** for consistent design

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **JWT Authentication** for secure access
- **RESTful API** architecture

### AI/ML Components
- **Python** for ML pipeline
- **YOLO** for player detection
- **MMAction2** for action recognition
- **OpenCV** for video processing
- **Custom ML Models** for play classification

## 📁 Project Structure

```
CourtViz/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions
│   │   └── styles/         # CSS and styling
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js Express server
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── config/         # Configuration files
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Python (v3.8 or higher)
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Database Setup
1. Create a PostgreSQL database
2. Update database configuration in `backend/src/config/db.js`
3. Run database migrations (when implemented)

### AI Pipeline Setup
1. Install Python dependencies:
```bash
pip install torch torchvision opencv-python mmaction2 ultralytics
```

## 🔧 Environment Variables

Create `.env` files in both frontend and backend directories:

### Backend (.env)
```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/courtviz
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## 📱 Usage

1. **Sign Up/Login** - Create an account as either a coach or player
2. **Dashboard Access** - Navigate to your role-specific dashboard
3. **Upload Video** (Coaches) - Upload game footage for analysis
4. **Review Analysis** - Access AI-tagged plays and performance metrics
5. **Track Progress** - Monitor goals and performance improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Real-time video analysis
- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] Integration with wearable devices
- [ ] Multi-sport support
- [ ] API for third-party integrations

## 📞 Contact

For questions or support, please reach out to the development team.

---

**Built with ❤️ for the basketball community** 