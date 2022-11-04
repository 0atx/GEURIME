from fastapi import FastAPI
from .predict import predict
from pydantic import BaseModel


class Image(BaseModel):
    url: str
class Data(BaseModel):
    depression: float
    violence: float
    happiness: float

app = FastAPI()

@app.get("/ai",  response_model=Data)
async def query(url: str):
    labels = ['depression', 'violence', 'happiness']
    prediction = predict(url)
    data = {}
    for i in range(3):
        data[f'{labels[i]}'] = prediction[i]
    return data

@app.post("/ai/predict",  response_model=Data)
async def predict(image: Image):
    labels = ['depression', 'violence', 'happiness']
    prediction = predict(image.url)
    data = {}
    for i in range(3):
        data[f'{labels[i]}'] = prediction[i]
    return data
