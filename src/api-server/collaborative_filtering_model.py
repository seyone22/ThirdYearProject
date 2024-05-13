import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from ast import literal_eval
from scipy.sparse import csr_matrix

# Load Data
# Import data from the goodbooks-10k repo
books_df = pd.read_csv('https://raw.githubusercontent.com/malcolmosh/goodbooks-10k/master/books_enriched.csv',
                       index_col=[0], converters={"genres": literal_eval})
books_ratings_df = pd.read_csv('https://raw.githubusercontent.com/malcolmosh/goodbooks-10k/master/ratings.csv')

# Create dictionary of user-item ratings
ratings_dict = {}
for user_id, book_id, rating in zip(books_ratings_df['user_id'], books_ratings_df['book_id'], books_ratings_df['rating']):
    if book_id not in ratings_dict:
        ratings_dict[book_id] = {}
    ratings_dict[book_id][user_id] = rating

# Determine number of unique books and users
num_books = len(ratings_dict)
num_users = len(set(books_ratings_df['user_id']))

# Initialize lists to store row indices, column indices, and data values for sparse matrix
row_indices = []
col_indices = []
data_values = []

# Populate the lists
for i, (book_id, ratings) in enumerate(ratings_dict.items()):
    for user_id, rating in ratings.items():
        row_indices.append(i)
        col_indices.append(user_id - 1)  # Adjust for 0-based indexing
        data_values.append(rating)

# Create a sparse matrix from the lists
sparse_item_feature_matrix = csr_matrix((data_values, (row_indices, col_indices)),
                                        shape=(num_books, num_users))

# Calculate cosine similarity between items
item_similarities = cosine_similarity(sparse_item_feature_matrix.T, dense_output=False)

print("Item Similarities (Cosine Similarity):")
print(item_similarities)
