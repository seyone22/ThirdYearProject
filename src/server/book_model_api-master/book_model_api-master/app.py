from flask import Flask, request
from joblib import load

app = Flask(__name__)
model = load('model.joblib')


@app.route('/predict', methods=['POST'])
def predict():  # put application's code here
    data = request.get_json()
    title = data['title']

    prediction = model(title)
    return {'prediction': prediction.tolist()}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
