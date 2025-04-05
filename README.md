# Medical Image Analysis System

A comprehensive full-stack application for medical image analysis, specializing in bone and tumor detection using advanced deep learning techniques. This system is designed to assist medical professionals in automating diagnostic workflows, improving efficiency, and enhancing patient care.

---

## Documentation

- **[U-Net Model Overview](./model.md)**: Detailed explanation of the U-Net architecture, its application in this project, and code snippets for better understanding.

---

## Project Structure

```
├── backend/                # Backend server implementation
│   ├── backend/           # Core backend code
│   │   ├── controller/    # Request handlers
│   │   ├── db/            # Database configurations
│   │   ├── middleware/    # Express middlewares
│   │   ├── models/        # Data models
│   │   ├── routes/        # API routes
│   └── utils/             # Utility functions
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

## Features

- **Bone Analysis and Detection**: Provides accurate identification of bone-related abnormalities using deep learning models.
- **Tumor Detection and Classification**: Offers advanced tumor analysis with classification capabilities for improved diagnostic accuracy.
- **Real-Time Image Processing**: Ensures fast and efficient analysis of medical images.
- **User-Friendly Web Interface**: Features an intuitive and responsive design for seamless interaction.
- **Secure File Upload System**: Implements robust mechanisms to ensure data privacy and integrity.

---

## Prerequisites

Ensure the following dependencies are installed before proceeding:

- [Node.js](https://nodejs.org/) for backend and frontend development.
- [Python 3.x](https://www.python.org/) for machine learning components.
- [PyTorch](https://pytorch.org/) for implementing deep learning models.
- [MongoDB](https://www.mongodb.com/) for database management.

---

## Installation

### Backend Setup
Navigate to the backend directory and install the required dependencies:
```bash
cd backend
npm install
```

### Frontend Setup
Navigate to the frontend directory and install the required dependencies:
```bash
cd frontend
npm install
```

### Python Environment Setup
Navigate to the Python directory and install the required Python packages:
```bash
cd backend/python
pip install -r requirements.txt
```

---

## Configuration

1. Create a `.env` file in the `backend` directory.
2. Configure the following settings:
   - MongoDB connection string for database integration.
   - Kaggle API credentials for accessing datasets used in training and validation.

---

## Running the Application

### Start Backend Server
Run the backend server using the following command:
```bash
cd backend
npm start
```

### Start Frontend Development Server
Run the frontend development server using the following command:
```bash
cd frontend
npm run dev
```

### Run Python Server
Run the Python server for machine learning components using the following command:
```bash
cd backend/python
python app.py
```

---

## Usage Instructions

1. Register and log in to the platform.
2. Navigate to the "Scan Reports" section.
3. Enter the patient's details, including name and phone number.
4. Upload test images:
   - For brain tumor detection, select images from the "brain tumor" folder.
   - For bone tumor detection, select images from the "bone tumor" folder.

> **Important**: Avoid using compressed or noisy images (e.g., Google images) as they may negatively impact detection accuracy.

---

## Development Stack

- **Backend**: Built using Express.js for handling API requests and server-side logic.
- **Frontend**: Developed with React and Vite for a modern and responsive user interface.
- **Machine Learning Models**: Implemented using PyTorch for high-performance deep learning.
- **Database**: MongoDB for efficient and scalable data storage.

---

## Test Images

A collection of sample test images for validating the machine learning models is available in the `test images/` folder.

---

## About

This platform is specifically designed to assist medical professionals by automating diagnostic processes, reducing manual effort, and improving the accuracy and speed of medical image analysis.
