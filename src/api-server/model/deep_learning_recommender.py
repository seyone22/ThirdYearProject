import pandas as pd
from ast import literal_eval

from model.components.preprocessors.keras_preprocessor import KerasPreprocessor
from tf_keras import layers, models

# Set the float format
pd.options.display.float_format = '{:.2f}'.format

# Import data from the goodbooks-10k repo
books_df = pd.read_csv('https://raw.githubusercontent.com/malcolmosh/goodbooks-10k/master/books_enriched.csv',
                       index_col=[0], converters={"genres": literal_eval})
books_ratings = pd.read_csv('https://raw.githubusercontent.com/malcolmosh/goodbooks-10k/master/ratings.csv')

# Extract book titles as input features
titles = books_df['title'].tolist()

max_sequence_length = max(len(title.split()) for title in titles)
vocabulary_size = len(set(word for title in titles for word in title.split()))
input_shape = (max_sequence_length,)

input_layer = layers.Input(shape=input_shape, name='input_layer')

embedding_dim = 50

embedding_layer = layers.Embedding(input_dim=vocabulary_size, output_dim=embedding_dim, input_length=max_sequence_length)(input_layer)

flatten_layer = layers.Flatten()(embedding_layer)

dense_layer_1 = layers.Dense(128, activation='relu')(flatten_layer)
dense_layer_2 = layers.Dense(64, activation='relu')(dense_layer_1)

output_layer = layers.Dense(num_classes, activation='softmax')(dense_layer_2)

model = models.Model(inputs=input_layer, outputs=output_layer)

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

model.summary()