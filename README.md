# Predictive Maintenance Using Machine Learning (Trending YouTube Video Statistics)

This project implements the machine learning workflow described in the `MLGLOB-1.pdf` document. It predicts whether a YouTube video will achieve "High Engagement" based on features like video age, title length, title word count, and tags.

## Prerequisites

1. **Python 3.x**
2. Install the required dependencies:
   ```bash
   pip install pandas numpy matplotlib seaborn scikit-learn
   ```

## Dataset

This project requires the **Trending YouTube Video Statistics** dataset from Kaggle.
1. Download the dataset from [Kaggle: Trending YouTube Video Statistics](https://www.kaggle.com/datasets/datasnaek/youtube-new).
2. Extract the downloaded archive.
3. Place the `CAvideos.csv` (or any other regional CSV file) in the same directory as the script.

## Usage

Run the Python script from your terminal:

```bash
python youtube_trending_analysis.py
```

If you are using a different CSV file from the dataset (e.g., `USvideos.csv`), you can pass it as an argument:

```bash
python youtube_trending_analysis.py USvideos.csv
```

## Features Implemented

*   **Data Cleaning:** Handles date conversions, missing values, and duplicate entries.
*   **Feature Engineering:** Extracts `video_age_days`, `title_len`, `title_word_count`, and `tag_count`.
*   **Target Variable:** Defines "High Engagement" videos as those in the 90th percentile of views.
*   **Machine Learning Models:** Trains and evaluates both `LogisticRegression` and `RandomForestClassifier`.
*   **Visualizations:** Automatically generates and saves `roc_curve.png` and `confusion_matrix_rf.png`.
