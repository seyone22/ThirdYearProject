from gensim.models import Word2Vec
from nltk.tokenize import word_tokenize
from sklearn.preprocessing import MultiLabelBinarizer
import pandas as pd
import numpy as np


class FeatureExtractor:
    def __init__(self):
        self.word2vec_model = None

    def train_word2vec_model(self, books_df_processed):
        # Tokenize text (title and description) into words
        tokenized_text = [word_tokenize(title + ' ' + desc) for title, desc in
                          zip(books_df_processed['title'], books_df_processed['description'])]

        # Train Word2Vec model
        self.word2vec_model = Word2Vec(sentences=tokenized_text, vector_size=100, window=5, min_count=1, workers=4)

    def extract_features(self, books_df_processed):
        if self.word2vec_model is None:
            self.train_word2vec_model(books_df_processed)

        # Generate document embeddings using Word2Vec
        document_embeddings = []
        for title, desc in zip(books_df_processed['title'], books_df_processed['description']):
            tokenized_title = word_tokenize(title)
            tokenized_desc = word_tokenize(desc)
            title_embedding = np.mean(
                [self.word2vec_model.wv.get_vector(word) for word in tokenized_title if word in self.word2vec_model.wv],
                axis=0)
            desc_embedding = np.mean(
                [self.word2vec_model.wv.get_vector(word) for word in tokenized_desc if word in self.word2vec_model.wv],
                axis=0)
            document_embeddings.append(title_embedding)

        # Binarize the genres column
        mlb = MultiLabelBinarizer()
        binarized_genres = mlb.fit_transform(books_df_processed['genres'])

        # One-hot encode the language_code
        books_df_subset = pd.get_dummies(books_df_processed, columns=['language_code'])

        # Combine document embeddings with other features
        composite_feature_vector = np.hstack([binarized_genres, document_embeddings])

        return composite_feature_vector
