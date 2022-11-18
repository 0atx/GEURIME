from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import ssl

def get_weather(year, month, day):

    context = ssl._create_unverified_context()

    url = f"https://www.weather.go.kr/w/obs-climate/land/past-obs/obs-by-element.do?stn=108&yy={year}&obs=90"

    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urlopen(req, context=context)
    soup = BeautifulSoup(html, "html.parser")
    
    weather = soup.select(f"#weather_table > tbody > tr:nth-child({day}) > td:nth-child({month + 1})")
    result = weather[0].span.text
    cloud = ['박무', '연무', '햇무리', '달무리', '달코로나', '채운', '안개', '황사']
    rain = ['비', '소나기', '안개비']
    snow = ['눈', '진눈깨비']
    if result == '\xa0':
        result = '맑음'
    elif result in cloud:
        result = '흐림'
    elif result in rain:
        result = '비'
    elif result in snow:
        result = '눈'
    else:
        result = '맑음'
    return result