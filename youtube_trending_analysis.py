import pandas as pd
import numpy as np
from pathlib import Path
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, roc_auc_score, roc_curve

def load_and_clean_data(data_path='CAvideos.csv'):
    """Load and clean the YouTube trending dataset."""
    assert Path(data_path).exists(), f"Dataset file {data_path} not found. Please download from Kaggle."
    
    print("Loading dataset...")
    df = pd.read_csv(data_path, on_bad_lines='skip', engine='python')
    print(f"Dataset Shape: {df.shape}")
    
    print("Cleaning and transforming data...")
    # Date Conversion
    df['trending_date'] = pd.to_datetime(df['trending_date'], format='%y.%d.%m', errors='coerce', utc=True)
    df['publish_time'] = pd.to_datetime(df['publish_time'], errors='coerce', utc=True)
    
    # Drop rows with invalid dates
    df = df.dropna(subset=['trending_date', 'publish_time'])
    
    # Clean data (remove errors or removed videos if the columns exist)
    if 'video_error_or_removed' in df.columns:
        df = df[df['video_error_or_removed'] == False]
        
    # Drop duplicates
    df = df.drop_duplicates(subset=['video_id'], keep='last')
    
    return df

def feature_engineering(df):
    """Create new features from the dataset."""
    print("Performing feature engineering...")
    
    # Video age in days
    df['video_age_days'] = (df['trending_date'] - df['publish_time']).dt.days
    df['video_age_days'] = df['video_age_days'].clip(lower=0) # Ensure no negative days
    
    # Title features
    df['title_len'] = df['title'].astype(str).apply(len)
    df['title_word_count'] = df['title'].astype(str).apply(lambda x: len(x.split()))
    
    # Tag count
    def tag_count(tags):
        if pd.isna(tags) or tags == '[none]':
            return 0
        return len(str(tags).split('|'))
    
    df['tag_count'] = df['tags'].apply(tag_count)
    
    # High engagement labeling (Target Variable)
    threshold = df['views'].quantile(0.90)
    print(f"90th percentile views threshold for High Engagement: {threshold:,.0f}")
    df['high_engagement'] = (df['views'] >= threshold).astype(int)
    
    return df

def prepare_features(df):
    """Select and encode features for modeling."""
    print("Preparing features for modeling...")
    # Select numeric features
    numeric_features = ['video_age_days', 'title_len', 'title_word_count', 'tag_count']
    X_numeric = df[numeric_features]
    
    # Category Encoding (One-Hot Encoding)
    df['category_id'] = df['category_id'].astype(str)
    category_encoded = pd.get_dummies(df['category_id'], prefix='category')
    
    # Feature Matrix
    X = pd.concat([X_numeric, category_encoded], axis=1)
    X = X.fillna(0) # Fill missing values
    
    y = df['high_engagement']
    
    return X, y

def train_and_evaluate_models(X, y):
    """Train machine learning models and evaluate performance."""
    print("Splitting dataset into train and test sets...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, stratify=y, random_state=42)
    
    print("Scaling features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # ---------------------------
    # Logistic Regression
    # ---------------------------
    print("\nTraining Logistic Regression...")
    lr_model = LogisticRegression(max_iter=1000, class_weight='balanced', random_state=42)
    lr_model.fit(X_train_scaled, y_train)
    
    y_pred_proba_lr = lr_model.predict_proba(X_test_scaled)[:, 1]
    y_pred_lr = (y_pred_proba_lr >= 0.5).astype(int)
    
    print("Logistic Regression Performance:")
    print(f"Accuracy: {accuracy_score(y_test, y_pred_lr):.4f}")
    print(f"ROC-AUC: {roc_auc_score(y_test, y_pred_proba_lr):.4f}")
    print("\nClassification Report:\n", classification_report(y_test, y_pred_lr))
    
    # ---------------------------
    # Random Forest Classifier
    # ---------------------------
    print("\nTraining Random Forest Classifier...")
    rf_model = RandomForestClassifier(n_estimators=200, max_depth=10, class_weight='balanced', random_state=42, n_jobs=-1)
    # Using unscaled data for Random Forest
    rf_model.fit(X_train, y_train)
    
    y_pred_proba_rf = rf_model.predict_proba(X_test)[:, 1]
    y_pred_rf = rf_model.predict(X_test)
    
    print("Random Forest Performance:")
    print(f"Accuracy: {accuracy_score(y_test, y_pred_rf):.4f}")
    print(f"ROC-AUC: {roc_auc_score(y_test, y_pred_proba_rf):.4f}")
    print("\nClassification Report:\n", classification_report(y_test, y_pred_rf))
    
    # ---------------------------
    # Visualizations
    # ---------------------------
    print("\nGenerating Visualizations...")
    
    # 1. ROC Curve
    plt.figure(figsize=(8, 6))
    fpr_lr, tpr_lr, _ = roc_curve(y_test, y_pred_proba_lr)
    fpr_rf, tpr_rf, _ = roc_curve(y_test, y_pred_proba_rf)
    
    plt.plot(fpr_lr, tpr_lr, label='Logistic Regression')
    plt.plot(fpr_rf, tpr_rf, label='Random Forest')
    plt.plot([0, 1], [0, 1], 'k--', label='Random Guess')
    
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('ROC Curve Comparison')
    plt.legend()
    plt.savefig('roc_curve.png')
    print("Saved ROC curve to roc_curve.png")
    
    # 2. Confusion Matrix (Random Forest)
    plt.figure(figsize=(6, 5))
    cm = confusion_matrix(y_test, y_pred_rf)
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.xlabel('Predicted Label')
    plt.ylabel('True Label')
    plt.title('Confusion Matrix - Random Forest')
    plt.savefig('confusion_matrix_rf.png')
    print("Saved Confusion Matrix to confusion_matrix_rf.png")

if __name__ == "__main__":
    import sys
    
    data_file = 'CAvideos.csv'
    if len(sys.argv) > 1:
        data_file = sys.argv[1]
        
    try:
        # Step 1: Load and Clean Data
        df = load_and_clean_data(data_path=data_file)
        
        # Step 2: Feature Engineering
        df = feature_engineering(df)
        
        # Step 3: Prepare Features
        X, y = prepare_features(df)
        
        # Step 4: Train and Evaluate Models
        train_and_evaluate_models(X, y)
        
        print("\nProject execution completed successfully!")
        
    except AssertionError as e:
        print(f"\nError: {e}")
        print("You can download the dataset from Kaggle:")
        print("https://www.kaggle.com/datasets/datasnaek/youtube-new")
    except Exception as e:
        print(f"\nAn unexpected error occurred: {e}")
