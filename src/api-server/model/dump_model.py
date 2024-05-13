from joblib import dump
import sys
import os

# Add the parent directory of the current directory to sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

# Import recommend_items function from content_based_filtering_model module
from content_based_fuzzy_filtering_model import recommend_items

# Dump the function to a joblib file
dump(recommend_items, 'model-fuzzy-tf-idf.joblib')
