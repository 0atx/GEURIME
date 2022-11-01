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

@app.get("/ai/")
async def root():
    return {"message": "Hello World"}

@app.post("/ai/predict/",  response_model=Data)
async def root(image: Image):
    labels = ['depression', 'violence', 'happiness']
    prediction = predict(image.url)
    data = {}
    for i in range(3):
        data[f'{labels[i]}'] = prediction[i]
    return data
