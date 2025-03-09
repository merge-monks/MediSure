# Medical Image Analysis System

A full-stack application for medical image analysis, specifically focused on bone and tumor detection using deep learning.

## Project Structure

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

## Features

- Bone analysis and detection
- Tumor detection and classification
- Real-time image processing
- User-friendly web interface
- Secure file upload system

## Prerequisites

- Node.js
- Python 3.x
- PyTorch
- MongoDB

## Installation

1. **Backend Setup**
    ```bash
    cd backend
    npm install
    ```

2. **Frontend Setup**
    ```bash
    cd frontend
    npm install
    ```

3. **Python Environment Setup**
    ```bash
    cd backend/python
    pip install -r requirements.txt
    ```

## Configuration

1. Create a `.env` file in the backend directory
2. Set up MongoDB connection
3. Configure Kaggle API credentials

## Running the Application

1. **Start Backend Server**
    ```bash
    cd backend
    npm start
    ```

2. **Start Frontend Development Server**
    ```bash
    cd frontend
    npm run dev
    ```

3. **Run Python Server**
    ```bash
    cd backend/python
    python app.py
    ```

## Usage Instructions

1. After signup and login, click on "Scan Reports".
2. Enter the patient's name and phone number.
3. If you are selecting brain tumor, select test images from "brain tumor". Otherwise, select test images for "bone tumor".

This platform is for use by doctors to automate their work.

**Note:** Using Google images for detection will not be helpful as they are compressed and have noise.

## Development

- Backend runs on Express.js
- Frontend built with React/Vite
- ML models implemented in PyTorch
- Test images available in the 'test images' folder
