from flask import Flask, request
from joblib import load
from flask_cors import CORS
import pandas as pd
from ast import literal_eval

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

filepath = 'https://raw.githubusercontent.com/malcolmosh/goodbooks-10k/master/books_enriched.csv'
print(f'Importing Data from {filepath}...')
# Import data from the goodbooks-10k repo
books_df = pd.read_csv(filepath, index_col=[0], converters={"genres": literal_eval})
print('Date import complete.\n')

# Load models
models = {
    'tf-idf': load('model-tf-idf.joblib'),
    'fuzzy-tf-idf': load('model-fuzzy-tf-idf.joblib')
    # Add other models here
}

data_index = pd.Series(books_df.index, index=books_df['title']).drop_duplicates()


def validate_request_data(data):
    if not data:
        return False, {'error': 'Request data is missing'}
    if 'title' not in data:
        return False, {'error': 'Title is missing from request data'}
    if 'model' not in data:
        return False, {'error': 'Model is missing from request data'}
    return True, None


@app.route('/models', methods=['GET'])
def get_available_models():
    if len(models) == 0:
        return {'error': 'No active models'}, 500
    else:
        return {'models': list(models.keys())}


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    valid, error_response = validate_request_data(data)
    # Check if request data is valid
    if not valid:
        return error_response, 400

    title = data['title']

    selected_model = data.get('model')
    # Check if the selected model is active
    if selected_model not in models:
        return {'error': 'Invalid model specified'}, 400

    # Select the model
    model = models[selected_model]

    # Run the prediction, and see if it's empty
    prediction = model(title)
    if len(prediction) == 0:
        return {'error': 'Book not found in database'}, 404

    return {'prediction': prediction.tolist()}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
