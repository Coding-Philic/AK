# 📁 AK PROJECT - COMPLETE FOLDER STRUCTURE DIAGRAM

## 🏗️ COMPLETE PROJECT ARCHITECTURE

```
AK/
│
├─ 📂 Backend/
│  ├─ 📂 config/
│  │  └─ db.js                          [MongoDB Connection Configuration]
│  │
│  ├─ 📂 models/
│  │  └─ Contact.js                     [Mongoose Schema for Contacts]
│  │
│  ├─ 📂 routes/
│  │  └─ contactRoute.js                [API Routes for Contact Form]
│  │
│  ├─ 📂 controllers/
│  │  └─ [contactController.js]         [Route Handler Logic]
│  │
│  ├─ 📂 middleware/
│  │  ├─ [errorHandler.js]              [Error Handling Middleware]
│  │  └─ [cors.js]                      [CORS Configuration]
│  │
│  ├─ 📂 validators/
│  │  └─ [contactValidator.js]          [Input Validation Logic]
│  │
│  ├─ 📂 utils/
│  │  ├─ [logger.js]                    [Logging Utility]
│  │  └─ [constants.js]                 [Application Constants]
│  │
│  ├─ 📂 logs/
│  │  └─ [date-stamps.log]              [Application Log Files]
│  │
│  ├─ 📄 .env                           [Environment Variables (SECRET)]
│  ├─ 📄 .env.example                   [Environment Template]
│  ├─ 📄 package.json                   [Dependencies & Scripts]
│  ├─ 📄 server.js                      [Express Server Entry Point]
│  └─ 📄 README.md                      [Backend Documentation]
│
│
├─ 📂 frontend/
│  ├─ 📂 assets/
│  │  ├─ 📂 css/
│  │  │  ├─ templatemo-edu-meeting.css  [Main Stylesheet]
│  │  │  ├─ best.css                    [Custom Styles]
│  │  │  ├─ flex-slider.css             [Slider Styles]
│  │  │  ├─ fontawesome.css             [Font Awesome Icons]
│  │  │  ├─ lightbox.css                [Lightbox Styles]
│  │  │  └─ owl.css                     [Carousel Styles]
│  │  │
│  │  ├─ 📂 js/
│  │  │  ├─ custom.js                   [Custom JavaScript]
│  │  │  ├─ isotope.js                  [Isotope Library]
│  │  │  ├─ isotope.min.js              [Isotope Minified]
│  │  │  ├─ lightbox.js                 [Lightbox Script]
│  │  │  ├─ owl-carousel.js             [Carousel Script]
│  │  │  ├─ slick-slider.js             [Slider Script]
│  │  │  ├─ tabs.js                     [Tab Navigation]
│  │  │  └─ video.js                    [Video Handler]
│  │  │
│  │  ├─ 📂 images/
│  │  │  ├─ s1.jpg, s2.jpg, ... s11.jpg [Student Profile Images]
│  │  │  ├─ [Faculty Images]
│  │  │  ├─ [Course Images]
│  │  │  └─ [Other Visual Assets]
│  │  │
│  │  └─ 📂 fonts/
│  │     └─ [Font Files (.ttf, .woff, etc.)]
│  │
│  ├─ 📂 components/
│  │  ├─ [header.html]                  [Reusable Header Component]
│  │  ├─ [footer.html]                  [Reusable Footer Component]
│  │  └─ [contact-form.html]            [Reusable Contact Form]
│  │
│  ├─ 📂 api/
│  │  ├─ [apiClient.js]                 [API Request Wrapper]
│  │  └─ [utils.js]                     [Frontend Utilities]
│  │
│  ├─ 📂 pages/
│  │  └─ [Page Templates]               [Reusable Page Layouts]
│  │
│  ├─ 📄 index.html                     [Homepage]
│  ├─ 📄 Best-Student.html              [Top Students Showcase]
│  ├─ 📄 Best-Teacher.html              [Top Teachers Showcase]
│  ├─ 📄 Faculty.html                   [Faculty Directory]
│  ├─ 📄 Faculty-details.html           [Faculty Details Page]
│  ├─ 📄 README.md                      [Frontend Documentation]
│  └─ 📄 [Other HTML pages]
│
│
├─ 📂 Student/
│  ├─ 📂 src/
│  │  ├─ 📂 components/
│  │  │  ├─ CharacterSection.jsx        [Character Display Component]
│  │  │  ├─ Hero.jsx                    [Hero Section Component]
│  │  │  ├─ Image.jsx                   [Image Component]
│  │  │  ├─ Logo.jsx                    [Logo Component]
│  │  │  ├─ Navbar.jsx                  [Navigation Bar Component]
│  │  │  ├─ Page.jsx                    [Page Layout Component]
│  │  │  ├─ Scroll.jsx                  [Scroll Animation Component]
│  │  │  ├─ ScrollMin.jsx               [Minimal Scroll Component]
│  │  │  ├─ Secondscroll.jsx            [Secondary Scroll Component]
│  │  │  │
│  │  │  ├─ 📂 ChatBot/
│  │  │  │  └─ ChatBot.jsx              [ChatBot Component]
│  │  │  │
│  │  │  ├─ 📂 Enquiry/
│  │  │  │  └─ Enquiry.jsx              [Enquiry Form Component]
│  │  │  │
│  │  │  ├─ 📂 Help/
│  │  │  │  └─ Help.jsx                 [Help Page Component]
│  │  │  │
│  │  │  ├─ 📂 login/
│  │  │  │  └─ Login.jsx                [Login Page Component]
│  │  │  │
│  │  │  ├─ 📂 Signup/
│  │  │  │  └─ Signup.jsx               [Registration Page Component]
│  │  │  │
│  │  │  └─ 📂 SecondComponents/
│  │  │     ├─ BmwWeb.jsx               [BMW Website Component]
│  │  │     └─ Home.jsx                 [Home Page Component]
│  │  │
│  │  ├─ 📂 pages/
│  │  │  └─ [Page Components]           [Full Page Templates]
│  │  │
│  │  ├─ 📂 utils/
│  │  │  └─ [helpers.js]                [Utility Functions]
│  │  │
│  │  ├─ 📂 hooks/
│  │  │  ├─ [useAuth.js]                [Authentication Hook]
│  │  │  └─ [useFetch.js]               [Fetch Data Hook]
│  │  │
│  │  ├─ 📂 context/
│  │  │  └─ [AuthContext.jsx]           [Authentication Context]
│  │  │
│  │  ├─ 📂 services/
│  │  │  └─ [api.js]                    [API Service Layer]
│  │  │
│  │  ├─ 📄 App.jsx                     [Root React Component]
│  │  ├─ 📄 App.css                     [App Styles]
│  │  ├─ 📄 main.jsx                    [Entry Point]
│  │  ├─ 📄 index.css                   [Global Styles]
│  │  └─ 📄 index.html                  [HTML Template]
│  │
│  ├─ 📂 public/
│  │  ├─ 📂 frames/
│  │  │  └─ [Image Frames]
│  │  │
│  │  ├─ 📂 secondframes/
│  │  │  └─ [Secondary Frames]
│  │  │
│  │  └─ 📂 thirdframes/
│  │     └─ [Third Set Frames]
│  │
│  ├─ 📂 server/
│  │  ├─ 📄 server.js                   [File Upload Server]
│  │  ├─ 📄 package.json                [Server Dependencies]
│  │  └─ 📂 uploads/
│  │     ├─ 1cb9a47eff12b164f128a25e4fd2246e
│  │     ├─ 3df659184a6f6da0ff956fc7b8670605
│  │     ├─ 6b6e598e29eaedf85bfadb4886ff5606
│  │     └─ ec39ca21fca51d1faa2fe7da444eca66
│  │
│  ├─ 📂 auth-server/
│  │  └─ 📂 backend/
│  │     ├─ 📂 models/
│  │     │  └─ user.js                  [User Model]
│  │     │
│  │     ├─ 📂 routes/
│  │     │  └─ auth.js                  [Auth Routes]
│  │     │
│  │     ├─ 📄 package.json
│  │     └─ 📄 server.js
│  │
│  ├─ 📂 Enquiry-backend/
│  │  └─ 📂 backend/
│  │     ├─ 📂 models/
│  │     │  └─ enquiryData.js           [Enquiry Model]
│  │     │
│  │     ├─ 📂 routes/
│  │     │  └─ auth.js                  [Enquiry Routes]
│  │     │
│  │     ├─ 📄 package.json
│  │     └─ 📄 server.js
│  │
│  ├─ 📄 package.json                   [Frontend Dependencies]
│  ├─ 📄 vite.config.js                 [Vite Configuration]
│  ├─ 📄 eslint.config.js               [ESLint Configuration]
│  ├─ 📄 README.md                      [Student Portal Docs]
│  ├─ 📄 index.html                     [Main HTML]
│  ├─ 📄 app.txt                        [Text File]
│  └─ 📄 const imageUrls = [.jl         [Image URLs File]
│
│
├─ 📄 .env.example                      [Environment Variables Template]
├─ 📄 .gitignore                        [Git Ignore Rules]
├─ 📄 README.md                         [Main Project Documentation]
├─ 📄 SETUP_GUIDE.md                    [Complete Setup Instructions]
└─ 📄 FOLDER_STRUCTURE.md               [Folder Structure Checklist]
```

---

## 📊 COMPONENT HIERARCHY

```
AK Project
│
├─ Backend Service (Node.js + Express)
│  │
│  ├─ Database Layer (MongoDB)
│  │  ├─ Contact Schema
│  │  ├─ User Schema (in auth-server)
│  │  └─ Enquiry Schema (in Enquiry-backend)
│  │
│  ├─ API Routes
│  │  ├─ /contact (POST)
│  │  ├─ /auth/* (Auth routes)
│  │  └─ /enquiry/* (Enquiry routes)
│  │
│  └─ Middleware & Utils
│     ├─ Error Handling
│     ├─ CORS Configuration
│     ├─ Input Validation
│     └─ Logging
│
├─ Frontend (Static HTML/CSS/JS)
│  │
│  ├─ Pages
│  │  ├─ index.html (Home)
│  │  ├─ Best-Student.html (Students)
│  │  ├─ Best-Teacher.html (Teachers)
│  │  └─ Faculty.html (Faculty)
│  │
│  ├─ Assets
│  │  ├─ Stylesheets (CSS)
│  │  ├─ Scripts (JS)
│  │  ├─ Images
│  │  └─ Fonts
│  │
│  └─ Reusable Components
│     ├─ Header
│     ├─ Footer
│     └─ Contact Form
│
└─ Student Portal (React + Vite)
   │
   ├─ Pages
   │  ├─ Home
   │  ├─ Login
   │  ├─ Signup
   │  ├─ Help
   │  └─ Enquiry
   │
   ├─ Components
   │  ├─ Navigation
   │  ├─ ChatBot
   │  ├─ Forms
   │  └─ Display Components
   │
   ├─ State Management
   │  ├─ Auth Context
   │  └─ Custom Hooks (useAuth, useFetch)
   │
   ├─ Services
   │  └─ API Service Layer
   │
   └─ Support Servers
      ├─ Auth Server
      └─ Enquiry Backend
```

---

## 🗂️ FILE TREE VISUALIZATION (DETAILED)

```
AK/
│
├── Backend/
│   ├── config/db.js
│   ├── models/Contact.js
│   ├── routes/contactRoute.js
│   ├── controllers/[contactController.js]
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── cors.js
│   ├── validators/contactValidator.js
│   ├── utils/
│   │   ├── logger.js
│   │   └── constants.js
│   ├── logs/
│   ├── .env (CONFIDENTIAL)
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── README.md
│
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── templatemo-edu-meeting.css
│   │   │   ├── best.css
│   │   │   ├── flex-slider.css
│   │   │   ├── fontawesome.css
│   │   │   ├── lightbox.css
│   │   │   └── owl.css
│   │   ├── js/
│   │   │   ├── custom.js
│   │   │   ├── isotope.js
│   │   │   ├── isotope.min.js
│   │   │   ├── lightbox.js
│   │   │   ├── owl-carousel.js
│   │   │   ├── slick-slider.js
│   │   │   ├── tabs.js
│   │   │   └── video.js
│   │   ├── images/
│   │   │   └── [student & faculty images]
│   │   └── fonts/
│   │       └── [font files]
│   ├── components/
│   │   ├── header.html
│   │   ├── footer.html
│   │   └── contact-form.html
│   ├── api/
│   │   ├── apiClient.js
│   │   └── utils.js
│   ├── pages/
│   ├── index.html
│   ├── Best-Student.html
│   ├── Best-Teacher.html
│   ├── Faculty.html
│   ├── Faculty-details.html
│   └── README.md
│
├── Student/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CharacterSection.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Image.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Page.jsx
│   │   │   ├── Scroll.jsx
│   │   │   ├── ScrollMin.jsx
│   │   │   ├── Secondscroll.jsx
│   │   │   ├── ChatBot/ChatBot.jsx
│   │   │   ├── Enquiry/Enquiry.jsx
│   │   │   ├── Help/Help.jsx
│   │   │   ├── login/Login.jsx
│   │   │   ├── Signup/Signup.jsx
│   │   │   └── SecondComponents/
│   │   │       ├── BmwWeb.jsx
│   │   │       └── Home.jsx
│   │   ├── pages/
│   │   ├── utils/helpers.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useFetch.js
│   │   ├── context/AuthContext.jsx
│   │   ├── services/api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── index.html
│   ├── public/
│   │   ├── frames/
│   │   ├── secondframes/
│   │   └── thirdframes/
│   ├── server/
│   │   ├── server.js
│   │   ├── package.json
│   │   └── uploads/
│   │       ├── 1cb9a47eff12b164f128a25e4fd2246e
│   │       ├── 3df659184a6f6da0ff956fc7b8670605
│   │       ├── 6b6e598e29eaedf85bfadb4886ff5606
│   │       └── ec39ca21fca51d1faa2fe7da444eca66
│   ├── auth-server/backend/
│   │   ├── models/user.js
│   │   ├── routes/auth.js
│   │   ├── package.json
│   │   └── server.js
│   ├── Enquiry-backend/backend/
│   │   ├── models/enquiryData.js
│   │   ├── routes/auth.js
│   │   ├── package.json
│   │   └── server.js
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── README.md
│   ├── index.html
│   ├── app.txt
│   └── const imageUrls = [.jl
│
├── .env.example
├── .gitignore
├── README.md
├── SETUP_GUIDE.md
└── FOLDER_STRUCTURE.md
```

---

## 🔗 CONNECTION DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Frontend (Static HTML)     │  Student Portal (React) │   │
│  │  - index.html               │  - App.jsx              │   │
│  │  - Best-Student.html        │  - Components           │   │
│  │  - Best-Teacher.html        │  - Pages                │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────┬──────────────────────┬─────────────────────────┘
               │                      │
               │ HTTP/AJAX Request    │ API Calls
               ▼                      ▼
        ┌──────────────────────────────────────────┐
        │    Backend API (Node.js + Express)       │
        │    Running on: http://localhost:5000     │
        │  ┌──────────────────────────────────┐    │
        │  │ Routes                           │    │
        │  │ - /contact (POST)                │    │
        │  │ - /auth/*                        │    │
        │  │ - /enquiry/*                     │    │
        │  └──────────────────────────────────┘    │
        │  ┌──────────────────────────────────┐    │
        │  │ Controllers & Validation         │    │
        │  └──────────────────────────────────┘    │
        └──────────────┬───────────────────────────┘
                       │
                       │ Query/Insert
                       ▼
        ┌──────────────────────────────────────────┐
        │    MongoDB Database (Cloud Atlas)        │
        │  ┌──────────────────────────────────┐    │
        │  │ Collections                      │    │
        │  │ - contacts                       │    │
        │  │ - users                          │    │
        │  │ - enquiries                      │    │
        │  └──────────────────────────────────┘    │
        └──────────────────────────────────────────┘
```

---

## 📍 PORT ALLOCATION

```
┌────────────────────────────────────────┐
│        Service Ports Configuration     │
├────────────────────────────────────────┤
│ Backend API       → Port 5000          │
│ Frontend (static) → Port 8000          │
│ Student Portal    → Port 5173 (Vite)  │
│ Auth Server       → Custom Port        │
│ Enquiry Server    → Custom Port        │
│ MongoDB           → Cloud (Atlas)      │
└────────────────────────────────────────┘
```

---

## 🔐 Security Structure

```
Sensitive Files (NOT in Git):
├── Backend/.env                 ← Database URI, Secrets
├── Backend/logs/                ← Server Logs
├── Student/server/uploads/      ← Uploaded Files
└── node_modules/                ← Dependencies

Public Files (In Git):
├── Backend/.env.example         ← Template Only
├── Source Code                  ← All JS/JSX files
├── HTML Templates               ← Frontend pages
├── Configuration Files          ← package.json, config files
└── Documentation                ← README, SETUP_GUIDE
```

---

## 📦 TOTAL PROJECT BREAKDOWN

```
Total Directories:     25+
Total Files:           70+
Package.json Count:    4 (Backend, Student, auth-server, Enquiry-backend)
Configuration Files:   6+ (.env, vite.config.js, eslint, etc.)
Component Count:       20+ (React Components)
API Endpoints:         10+ (Routes)
Database Collections:  3+ (contacts, users, enquiries)
```

---

**This is your COMPLETE folder structure diagram!**
✅ All directories documented
✅ All files listed
✅ Connection paths shown
✅ Port allocation defined
✅ Security structure outlined
