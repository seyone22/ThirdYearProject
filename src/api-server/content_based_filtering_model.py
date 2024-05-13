import pandas as pd
from ast import literal_eval
from model.components.featureExtractors.feature_extractor_tf_idf import FeatureExtractor
from model.components.preprocessors.data_preprocessor_v2 import DataPreprocessor
from sklearn.metrics.pairwise import cosine_similarity

# Set the float format
pd.options.display.float_format = '{:.2f}'.format

"""# Import Data"""
filepath = 'https://raw.githubusercontent.com/malcolmosh/goodbooks-10k/master/books_enriched.csv'
print(f'Importing Data from {filepath}...')
# Import data from the goodbooks-10k repo
books_df = pd.read_csv(filepath, index_col=[0], converters={"genres": literal_eval})
books_ratings = pd.read_csv(filepath)
print('Date import complete.\n')

"""# Preprocessing"""
print('Performing Preprocessing...')
preprocessor = DataPreprocessor()
books_df_processed = preprocessor.preprocess(books_df)

indices = pd.Series(books_df_processed.index, index=books_df_processed['title']).drop_duplicates()
print('Preprocessing complete.\n')


"""# Feature Extraction"""
print('Performing Feature Extraction...')
featureExtractor = FeatureExtractor()
composite_feature_vector = featureExtractor.extract_features(books_df_processed)
print('Feature Extraction complete.\n')


"""# Similarity Measure"""
print('Generating Similarity Measures...')
# Using Cosine Similarity
cosine_sim = cosine_similarity(composite_feature_vector)
print('Similarity Measure generation complete.\n')


def recommend_items(title, similarity_measure=cosine_sim, fuzzy=False):
    # Convert input title to lowercase
    title = title.lower()

    # Get the index of the item that matches the title
    idx = indices[title]

    # Get the pairwise similarity scores of all items with that item
    sim_scores = list(enumerate(similarity_measure[idx]))

    # Sort the items based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the 10 most similar items
    sim_scores = sim_scores[1:11]

    # Get the item indices
    item_indices = [i[0] for i in sim_scores]

    # Return the top 10 most similar items
    return books_df_processed['title'].iloc[item_indices]
