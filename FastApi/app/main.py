from fastapi import FastAPI
from .predict import predict
from pydantic import BaseModel


class Image(BaseModel):
    url: str
class Data(BaseModel):
    emotion: str
    prediction: float

app = FastAPI()

@app.get("/ai")
async def root():
    return {"message": "Hello World"}

@app.post("/ai/predict/",  response_model=Data)
async def root(image: Image):
    prediction = predict(image.url)
    data = {"emotion": prediction["emotion"], "prediction": prediction["prediction"]}
    return data
