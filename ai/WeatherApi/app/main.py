from fastapi import FastAPI
from .weather import get_weather


app = FastAPI()

# 날씨 api 
@app.get("/weather")
async def weather(year: int, month: int, day: int):
    weather = get_weather(year, month, day)
    return weather