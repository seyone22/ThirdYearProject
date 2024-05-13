from flask import Flask, request
from joblib import load
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

model = load('model-tf-idf.joblib')


@app.route('/predict', methods=['POST'])
def predict():  # put application's code here
    data = request.get_json()
    title = data['title']

    prediction = model(title)
    return {'prediction': prediction.tolist()}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)