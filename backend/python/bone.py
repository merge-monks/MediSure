import opendatasets as od
import os
import cv2
import numpy as np
import torch
import torch.nn as nn

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
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
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'multi_task_unet100.pth')
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.eval()

def preprocess_image(image_path, image_size=128):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    image = cv2.resize(image, (image_size, image_size))
    image = image / 255.0  
    image = image.astype(np.float32)
    image = np.expand_dims(image, axis=0)  
    return torch.tensor(image).unsqueeze(0).to(device) 


def predict_bone(image_path):
    image = preprocess_image(image_path)
    with torch.no_grad():
        seg_output, class_output = model(image)
    
    seg_mask = (seg_output.squeeze().cpu().numpy() > 0.3).astype(np.uint8)
    tumor_types = ['tumor', 'no tumor']
    predicted_label = tumor_types[class_output.argmax(dim=1).item()]
    return seg_mask, predicted_label