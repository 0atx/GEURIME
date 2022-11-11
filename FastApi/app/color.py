import urllib.request
from io import BytesIO
import extcolors
from PIL import Image


def color_analysis(url):

    req = urllib.request.Request(url, headers = {"User-Agent" : "Mozilla/5.0"})
    res = urllib.request.urlopen(req).read()

    # Image open
    urlopen_img = Image.open(BytesIO(res))
    
    colors, pixel_count = extcolors.extract_from_image(urlopen_img, tolerance = 15, limit = 7)

    analysis = []
    for c in colors:
        analysis.append({f'{c[0]}' : [round((c[1] / pixel_count) * 100, 2), c[1]]})
    return analysis