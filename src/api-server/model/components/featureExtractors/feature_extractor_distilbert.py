from transformers import DistilBertTokenizer, TFDistilBertModel
import pandas as pd
import numpy as np
import tensorflow as tf


class FeatureExtractor:
    def __init__(self, model_name="distilbert-base-uncased"):
        self.tokenizer = DistilBertTokenizer.from_pretrained(model_name)
        self.model = TFDistilBertModel.from_pretrained(model_name)

    def extract_features(self, books_df_processed):
        document_embeddings = []
        for author, title, desc, genres in zip(books_df_processed['author'], books_df_processed['title'],
                                               books_df_processed['description'], books_df_processed['genres']):
            # Tokenize and process author, title, and description separately
            author_tokens = self.tokenizer(author, padding=True, truncation=True, return_tensors="tf")
            title_tokens = self.tokenizer(title, padding=True, truncation=True, return_tensors="tf")
            desc_tokens = self.tokenizer(desc, padding=True, truncation=True, return_tensors="tf")

            # Tokenize and process each genre separately
            genre_tokens_list = [self.tokenizer(genre, padding=True, truncation=True, return_tensors="tf")
                                 for genre in genres]

            # Concatenate embeddings
            embeddings_list = [self.model(tokens).last_hidden_state for tokens in
                               [author_tokens, title_tokens, desc_tokens] + genre_tokens_list]
            combined_embedding = tf.reduce_mean(tf.concat(embeddings_list, axis=1), axis=1)

            document_embeddings.append(combined_embedding.numpy())

        composite_feature_vector = np.hstack(document_embeddings)
        return composite_feature_vector
