import pandas as pd
from tf_keras import layers


class KerasPreprocessor:
    def preprocess(self, books_df):
        # Extract book titles as input features
        titles = books_df['title'].tolist()

        max_sequence_length = max(len(title.split()) for title in titles)

        input_shape = (max_sequence_length,)

        input_layer = layers.Input(shape=input_shape, name='input_layer')
        return input_layer
