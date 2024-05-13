import pandas as pd


class DataPreprocessor:
    def preprocess(self, books_df):
        # Columns of the dataset we are interested in for this model
        columns_to_keep = \
            ['authors', 'average_rating', 'genres', 'language_code', 'title', 'description']

        # Subset of the dataset with only the above columns
        books_df_subset = books_df[columns_to_keep]

        # Extract the first author of the authors list and use it.
        books_df_subset['author'] = books_df_subset['authors'].apply(lambda x: x[0]).astype(str)

        # Remove NaNs from the description column
        books_df_subset['description'] = books_df_subset['description'].fillna('')

        # Remove NaNs from the original_title column
        books_df_subset['title'] = books_df_subset['title'].fillna('')
        books_df_subset['title'] = books_df_subset['title'].str.lower()

        return books_df_subset
