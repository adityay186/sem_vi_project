from flask import Flask, render_template, request, jsonify
import numpy as np
from predict_disease import predict_disease
import json

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    reported_symptoms = request.get_json()
    print(reported_symptoms)
    predicted_disease = predict_disease(reported_symptoms)
    predicted_disease = predicted_disease.tolist()  # Convert ndarray to list
    return json.dumps(predicted_disease)

if __name__ == "__main__":
    app.debug = True
    app.run()
