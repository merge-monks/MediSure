# 🩺 Medical Image Analysis System

A comprehensive full-stack application for medical image analysis, specializing in bone and tumor detection using state-of-the-art deep learning techniques.

---

## 📂 Project Structure

```
├── backend/                # Backend server implementation
│   ├── backend/           # Core backend code
│   │   ├── controller/    # Request handlers
│   │   ├── db/            # Database configurations
│   │   ├── middleware/    # Express middlewares
│   │   ├── models/        # Data models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   ├── python/            # Machine Learning components
│   │   ├── bone.py        # Bone analysis model
│   │   ├── tumor.ipynb    # Tumor detection notebook
│   │   └── app.py         # Python API server
│   └── uploads/           # File upload directory
│
├── frontend/               # Frontend application
│   ├── public/            # Static assets
│   └── src/               # Source code
│
└── test images/            # Test images for model validation
```

---

## ✨ Features

- **Bone Analysis and Detection**: Accurate identification of bone-related abnormalities.
- **Tumor Detection and Classification**: Advanced tumor analysis with classification capabilities.
- **Real-Time Image Processing**: Fast and efficient image analysis.
- **User-Friendly Web Interface**: Intuitive and responsive design for seamless user experience.
- **Secure File Upload System**: Ensures data privacy and integrity.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Python 3.x](https://www.python.org/)
- [PyTorch](https://pytorch.org/)
- [MongoDB](https://www.mongodb.com/)

---

## 🚀 Installation

### 1. Backend Setup
```bash
cd backend
npm install
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Python Environment Setup
```bash
cd backend/python
pip install -r requirements.txt
```

---

## ⚙️ Configuration

1. Create a `.env` file in the `backend` directory.
2. Configure the following:
   - MongoDB connection string.
   - Kaggle API credentials for accessing datasets.

---

## ▶️ Running the Application

### 1. Start Backend Server
```bash
cd backend
npm start
```

### 2. Start Frontend Development Server
```bash
cd frontend
npm run dev
```

### 3. Run Python Server
```bash
cd backend/python
python app.py
```

---

## 📖 Usage Instructions

1. Sign up and log in to the platform.
2. Navigate to the **Scan Reports** section.
3. Enter the patient's details (name and phone number).
4. Upload test images:
   - For brain tumor detection, select images from the "brain tumor" folder.
   - For bone tumor detection, select images from the "bone tumor" folder.

> **Note**: Avoid using Google images for detection as they are often compressed and noisy, which may affect accuracy.

---

## 🛠️ Development Stack

- **Backend**: Express.js
- **Frontend**: React with Vite
- **Machine Learning Models**: PyTorch
- **Database**: MongoDB

---

## 📂 Test Images

Sample test images for model validation are available in the `test images/` folder.

---

## 👨‍⚕️ About

This platform is designed to assist medical professionals in automating diagnostic workflows, improving efficiency, and enhancing patient care.
