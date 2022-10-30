from fastapi import FastAPI
from predict import predict
from pydantic import BaseModel


class Image(BaseModel):
    url: str

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/predict/")
async def root(image: Image):
    data = predict(image.url)
    return data
