from fastapi import FastAPI
import tensorflow as tf
from tensorflow.keras.models import load_model

model_path = 'models/mnist_cnn.ckpt'
model = load_model(model_path)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}