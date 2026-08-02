from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_curve, confusion_matrix
from pathlib import Path
import os

app = Flask(__name__)

# Global variables to hold the trained model, feature columns, and metrics
model = None
feature_columns = None
metrics_data = {}

def init_model():
    global model, feature_columns
    print("Initializing and training model...")
    data_path = 'CAvideos.csv'
    
    if not Path(data_path).exists():
        print(f"Dataset {data_path} not found. Cannot train model.")
        return

    # Load and clean data
    df = pd.read_csv(data_path, on_bad_lines='skip', engine='python')
    df['trending_date'] = pd.to_datetime(df['trending_date'], format='%y.%d.%m', errors='coerce', utc=True)
    df['publish_time'] = pd.to_datetime(df['publish_time'], errors='coerce', utc=True)
    df = df.dropna(subset=['trending_date', 'publish_time'])
    
    # Feature Engineering
    df['video_age_days'] = (df['trending_date'] - df['publish_time']).dt.days.clip(lower=0)
    df['title_len'] = df['title'].astype(str).apply(len)
    df['title_word_count'] = df['title'].astype(str).apply(lambda x: len(x.split()))
    
    def tag_count(tags):
        if pd.isna(tags) or tags == '[none]': return 0
        return len(str(tags).split('|'))
    df['tag_count'] = df['tags'].apply(tag_count)
    
    threshold = df['views'].quantile(0.90)
    df['high_engagement'] = (df['views'] >= threshold).astype(int)
    
    # Prepare features
    numeric_features = ['video_age_days', 'title_len', 'title_word_count', 'tag_count']
    X_numeric = df[numeric_features]
    df['category_id'] = df['category_id'].astype(str)
    category_encoded = pd.get_dummies(df['category_id'], prefix='category')
    
    X = pd.concat([X_numeric, category_encoded], axis=1).fillna(0)
    y = df['high_engagement']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
    
    # Train Random Forest
    rf_model = RandomForestClassifier(n_estimators=100, max_depth=10, class_weight='balanced', random_state=42)
    rf_model.fit(X_train, y_train)
    
    model = rf_model
    feature_columns = X.columns
    
    # Calculate metrics dynamically
    y_pred_proba = rf_model.predict_proba(X_test)[:, 1]
    y_pred = rf_model.predict(X_test)
    
    fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
    cm = confusion_matrix(y_test, y_pred)
    
    global metrics_data
    metrics_data = {
        'roc': {
            'fpr': fpr.tolist(),
            'tpr': tpr.tolist()
        },
        'confusion_matrix': cm.tolist()
    }
    
    print("Model trained and metrics generated successfully!")

# Initialize model on startup
init_model()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model is not trained. Dataset missing.'}), 500
        
    try:
        data = request.json
        video_age = int(data.get('video_age_days', 0))
        title_len = int(data.get('title_len', 0))
        title_words = int(data.get('title_word_count', 0))
        tags = int(data.get('tag_count', 0))
        category = str(data.get('category_id', '1'))
        
        # Create input dataframe matching feature_columns
        input_data = pd.DataFrame(columns=feature_columns)
        input_data.loc[0] = 0 # Initialize with 0s
        
        # Set numeric features
        input_data.at[0, 'video_age_days'] = video_age
        input_data.at[0, 'title_len'] = title_len
        input_data.at[0, 'title_word_count'] = title_words
        input_data.at[0, 'tag_count'] = tags
        
        # Set category
        cat_col = f'category_{category}'
        if cat_col in input_data.columns:
            input_data.at[0, cat_col] = 1
            
        # Predict
        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0][1]
        
        return jsonify({
            'prediction': int(prediction),
            'probability': float(probability),
            'message': 'High Engagement!' if prediction == 1 else 'Normal Engagement'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/metrics')
def get_metrics():
    if not metrics_data:
        return jsonify({'error': 'Metrics not available.'}), 500
    return jsonify(metrics_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
