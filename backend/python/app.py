import opendatasets as od
import cgi
import os
import cv2
import numpy as np
import torch
import torch.nn as nn
# Set matplotlib backend to Agg to avoid GUI thread issues
import matplotlib
matplotlib.use('Agg')  # Must be before importing pyplot
import matplotlib.pyplot as plt
from flask import Flask, request, jsonify, send_file, make_response, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import io
from bone import predict_bone
import base64
import time
import uuid

app = Flask(__name__)
# Configure CORS properly - allow all origins explicitly
CORS(app, resources={
    r"/*": {
        "origins": "*",  # Allow all origins
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'tif', 'tiff', 'dicom', 'dcm'}

# Create uploads directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

IMAGE_SIZE = 128  # Resize to 128x128

class MultiTaskUNet(nn.Module):
    def __init__(self, in_channels, num_classes):
        super(MultiTaskUNet, self).__init__()
        self.encoder = nn.Sequential(
            nn.Conv2d(in_channels, 64, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.Conv2d(64, 64, kernel_size=3, padding=1),
            nn.ReLU(inplace=True)
        )
        self.decoder_segmentation = nn.Conv2d(64, 1, kernel_size=1)  # For segmentation
        self.decoder_classification = nn.Linear(64 * IMAGE_SIZE * IMAGE_SIZE, num_classes)  # For classification

    def forward(self, x):
        x1 = self.encoder(x)
        seg_output = self.decoder_segmentation(x1)

        # Classification output
        x_flat = torch.flatten(x1, 1)
        class_output = self.decoder_classification(x_flat)

        return seg_output, class_output
    
device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = MultiTaskUNet(in_channels=1, num_classes=4).to(device)
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'multi_task_unet.pth')
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.eval()

def preprocess_image(image_path, image_size=128):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    image = cv2.resize(image, (image_size, image_size))
    image = image / 255.0  
    image = image.astype(np.float32)
    image = np.expand_dims(image, axis=0)  
    return torch.tensor(image).unsqueeze(0).to(device) 


def predict(image_path):
    image = preprocess_image(image_path)
    with torch.no_grad():
        seg_output, class_output = model(image)
    
    seg_mask = (seg_output.squeeze().cpu().numpy() > 0.3).astype(np.uint8)
    tumor_types = ['glioma', 'meningioma', 'pituitary', 'no_tumor']
    predicted_label = tumor_types[class_output.argmax(dim=1).item()]
    return seg_mask, predicted_label

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict_tumor():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response
        
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    patient_name = request.form.get('patientName', 'Unknown')
    scan_type = request.form.get('scanType', 'CT scan')
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    filename = secure_filename(file.filename)
    timestamp = str(int(time.time()))
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{timestamp}_{filename}")
    file.save(file_path)
    
    try:
        seg_mask, predicted_label = predict(file_path)
        
        original_image = cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)
        original_image = cv2.resize(original_image, (IMAGE_SIZE, IMAGE_SIZE))
        
        plt.figure(figsize=(6, 6))
        plt.imshow(original_image, cmap='gray')
        plt.imshow(seg_mask, cmap='jet', alpha=0.5)  
        plt.title(f"Predicted: {predicted_label}")
        plt.axis("off")
        
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight', pad_inches=0.1, dpi=100)
        plt.close()
        buf.seek(0)
        
        # Create response with prediction in header
        response = make_response(send_file(buf, mimetype='image/png'))
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        # Add prediction header and expose it
        response.headers.add('X-Prediction', predicted_label)
        response.headers.add('Access-Control-Expose-Headers', 'X-Prediction')
        
        # Clean up the file after processing
        if os.path.exists(file_path):
            os.remove(file_path)
            
        return response
        
    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({'error': str(e)}), 500

@app.route('/predict_bone_route', methods=['POST', 'OPTIONS'])
def predict_bone_route():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response
        
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    
    try:
        seg_mask, predicted_label = predict_bone(file_path)
        
        original_image = cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)
        original_image = cv2.resize(original_image, (IMAGE_SIZE, IMAGE_SIZE))
        
        plt.figure(figsize=(6, 6))
        plt.imshow(original_image, cmap='gray')
        plt.imshow(seg_mask, cmap='jet', alpha=0.5)  
        plt.title(f"Predicted: {predicted_label}")
        plt.axis("off")
        
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight', pad_inches=0.1, dpi=100)
        plt.close()  # Close the figure to prevent memory leaks
        buf.seek(0)
        
        # Create response with prediction in header
        response = make_response(send_file(buf, mimetype='image/png'))
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        # Add prediction header and expose it
        response.headers.add('X-Prediction', predicted_label)
        response.headers.add('Access-Control-Expose-Headers', 'X-Prediction')
        
        # Clean up the file after processing
        if os.path.exists(file_path):
            os.remove(file_path)
            
        return response
        
    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        return jsonify({'error': str(e)}), 500

# Route to serve uploaded images
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=False)
