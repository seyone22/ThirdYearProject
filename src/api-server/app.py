from flask import Flask, request
from joblib import load
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Load models
models = {
    'tf-idf': load('model-tf-idf.joblib'),
    # Add other models here
}


def validate_request_data(data):
    if not data:
        return False, {'error': 'Request data is missing'}
    if 'title' not in data:
        return False, {'error': 'Title is missing from request data'}
    if 'model' not in data:
        return False, {'error': 'Model is missing from request data'}
    return True, None


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

    model = models[selected_model]

    # Run the prediction, and return data
    prediction = model(title)
    return {'prediction': prediction.tolist()}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
