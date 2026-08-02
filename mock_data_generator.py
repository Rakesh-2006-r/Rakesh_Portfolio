import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def create_mock_data():
    num_rows = 500
    np.random.seed(42)
    
    # Generate dates
    base_date = datetime(2023, 1, 1)
    publish_dates = [base_date + timedelta(days=np.random.randint(0, 365)) for _ in range(num_rows)]
    trending_dates = [d + timedelta(days=np.random.randint(1, 30)) for d in publish_dates]
    
    # Format dates
    trending_date_strs = [d.strftime('%y.%d.%m') for d in trending_dates]
    publish_time_strs = [d.strftime('%Y-%m-%dT%H:%M:%S.000Z') for d in publish_dates]
    
    # Generate titles
    words = ['awesome', 'video', 'tutorial', 'how', 'to', 'make', 'best', 'new', 'vlog', 'daily', 'review']
    titles = [' '.join(np.random.choice(words, size=np.random.randint(3, 15))) for _ in range(num_rows)]
    
    # Generate tags
    tag_lists = ['|'.join(np.random.choice(words, size=np.random.randint(0, 10))) for _ in range(num_rows)]
    
    df = pd.DataFrame({
        'video_id': [f'vid_{i}' for i in range(num_rows)],
        'trending_date': trending_date_strs,
        'title': titles,
        'channel_title': [f'Channel {np.random.randint(1, 50)}' for _ in range(num_rows)],
        'category_id': np.random.randint(1, 15, size=num_rows),
        'publish_time': publish_time_strs,
        'tags': tag_lists,
        'views': np.random.randint(1000, 1000000, size=num_rows),
        'likes': np.random.randint(10, 50000, size=num_rows),
        'dislikes': np.random.randint(0, 1000, size=num_rows),
        'comment_count': np.random.randint(0, 5000, size=num_rows),
        'thumbnail_link': ['http://example.com' for _ in range(num_rows)],
        'comments_disabled': np.random.choice([False, True], p=[0.9, 0.1], size=num_rows),
        'ratings_disabled': np.random.choice([False, True], p=[0.95, 0.05], size=num_rows),
        'video_error_or_removed': np.random.choice([False, True], p=[0.98, 0.02], size=num_rows)
    })
    
    df.to_csv('CAvideos.csv', index=False)
    print("Created mock CAvideos.csv successfully!")

if __name__ == '__main__':
    create_mock_data()
