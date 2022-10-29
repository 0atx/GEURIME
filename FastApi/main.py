from fastapi import FastAPI
import tensorflow as tf
import numpy as np
import cv2
import imageio
import cv2
# from tensorflow.keras.preprocessing import image

model_path = 'efficientnet_v2_s_childdata.h5'
# model = load_model(model_path)
model = tf.keras.models.load_model(model_path)
train_input_shape = (224, 224, 3)
labels = ['depression', 'violence', 'happiness']

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/predict/{url}")
async def root(url : str):
    web_image = imageio.imread(url)
    web_image = cv2.resize(web_image, dsize=train_input_shape[0:2], )
    # web_image = image.img_to_array(web_image)
    web_image = tf.keras.preprocessing.image.img_to_array(web_image)
    web_image /= 255.
    web_image = np.expand_dims(web_image, axis=0)
    prediction = model.predict(web_image)
    prediction_probability = np.amax(prediction)
    prediction_idx = np.argmax(prediction)
    emotion = labels[prediction_idx]
    return {"emotion": emotion, "prediction": prediction_probability}
