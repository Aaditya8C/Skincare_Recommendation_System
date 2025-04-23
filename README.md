# Peronalized Virtual Skincare Advisor

## About
This application recommends personalised skincare and makeup products by analyzing a user's selfie through advanced Computer Vision algorithms. Using image processing and CNN models, the app determines key skin metrics such as Skin Tone, Skin Type, and Acne Concern Level. It recommends products based on cosine similarity to match user attributes with the most relevant items.

### Tools Used:
- **Frontend**: React  
- **Backend**: Flask, OpenCV, TensorFlow  
- **Libraries**: face-api.js for face detection, EfficientNet for CNN models  
- **Dataset Sources**: Kaggle and Myntra Beauty Section  

---

## Team Members

- Om Lahane
- Riya Kamatkar 
- Khushi  
- Dhanshree  

---

## Web Application Overview

### Frontend Routes

#### `/` - ImageInput
- **Purpose**: Initial page where the user is prompted to take a selfie.
- **Features**: 
  - Displays a live video feed from the user's camera (4:3 aspect ratio).
  - Uses face-api.js for face detection to ensure a single face is in the frame with proper lighting and framing.
  - Provides real-time instructions for the user to follow before capturing a selfie.
- **Outcome**: Once the selfie is taken, the user is redirected to `/form`.

#### `/form` - Form
- **Purpose**: Displays the inferred skin metrics from the selfie.
- **Features**: 
  - The form is prefilled with detected skin attributes.
  - Users can modify the metrics and add additional skin concerns.
- **Outcome**: On submission, the user is redirected to `/recs`.

#### `/recs` - Recommendations
- **Purpose**: Displays the recommended products.
- **Features**:
  - Recommendations are shown as clickable product cards with detailed information.
  - Each card links to the corresponding product page.

### Backend Routes

#### `[PUT]/upload`
- **Functionality**: 
  - Accepts a base64-encoded image, converts it to PNG, and processes it through the skin metrics pipeline.
  - Returns JSON data with inferred attributes (skin tone, type, and acne level).

#### `[PUT]/recommend`
- **Functionality**: 
  - Accepts a request body with the user's skin details.
  - Returns the top 5 recommended products per category in JSON format.

---

## Models

### Skin Tone
- **Process**:
  1. Detect and extract skin pixels using segmentation and clustering techniques.
  2. Classify the extracted color values into Fitzpatrick skin tone classes using a KNN model.
- **Highlights**:
  - Skin pixels are segmented using thresholds derived from image histograms.
  - Utilizes HSV and YCrCb color spaces for enhanced accuracy under varied lighting conditions.
  - Clustering is performed to isolate skin pixels for tone classification.

### Skin Type
- **Model**: A CNN classifies skin type into three categories: Dry, Oily, and Normal.
- **Architecture**: Transfer learning with EfficientNet B0.
- **Performance**: 
  - Training Accuracy: 87.1%
  - Validation Accuracy: 80%
- **Challenges**: Limited availability of quality facial image datasets.

### Acne Concern Level
- **Model**: Similar architecture to the Skin Type model.
- **Categories**: Low, Moderate, Severe.
- **Dataset**: Acne Grading Classification Dataset from Kaggle.
- **Performance**: Achieved 68% accuracy on training and validation datasets.

---

## Recommender System

The system matches user skin metrics and concerns with product attributes using cosine similarity. 

### Key Steps:
1. **Input**: User's skin attributes.
2. **Product Matching**: Compute cosine similarity between user attributes and product feature vectors.
3. **Output**: Top N recommended products for each category.

---

## How to Run

1. Clone this repository and navigate to the root directory.
2. Create a virtual environment and install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Start the backend:
    ```bash
    cd backend
    python app.py
    ```
4. Set up the frontend:
    ```bash
    cd frontend
    npm install
    npm start
    ```
5. Access the application at `http://localhost:3000`.

---

### Links

- [Acne Grading Dataset on Kaggle](https://www.kaggle.com/rutviklathiyateksun/acne-grading-classificationdataset)
