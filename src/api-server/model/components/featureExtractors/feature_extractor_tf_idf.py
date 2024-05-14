from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction import FeatureHasher
from sklearn.preprocessing import MultiLabelBinarizer
import pandas as pd
from scipy.sparse import hstack

class FeatureExtractor:
    def extract_features(self, books_df_processed):
        vectorizer = TfidfVectorizer()

        # Count of unique authors
        count_of_unique_authors = books_df_processed['author'].nunique()

        hasher = FeatureHasher(n_features=count_of_unique_authors, input_type='string')
        mlb = MultiLabelBinarizer()

        # Hash the authors
        # author_features = hasher.transform(books_df_subset['author'])

        # Binarize the genres column
        binarized_genres = mlb.fit_transform(books_df_processed['genres'])

        # One-hot encode the language_code
        books_df_subset = pd.get_dummies(books_df_processed, columns=['language_code'])

        # Vectorize the title column
        title_features = vectorizer.fit_transform(books_df_subset['title'])

        # Vectorize the description column
        description_features = vectorizer.fit_transform(books_df_subset['description'])

        # Composite feature Vector
        composite_feature_vector = hstack([binarized_genres, title_features, description_features])

        return composite_feature_vector
