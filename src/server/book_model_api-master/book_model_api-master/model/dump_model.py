from joblib import dump
from content_based_filtering_model import recommend_items

dump(recommend_items, 'model.joblib')