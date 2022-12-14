import tensorflow as tf
import numpy as np
import cv2
import imageio.v3 as iio
import urllib.request
# from tensorflow.keras.preprocessing import image

def url_to_image(url):
    resp = urllib.request.urlopen(url)
    image = np.asarray(bytearray(resp.read()))
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    return image

def predict(url):
    model_path = "/code/app/efficientnet_data_v4(batch8_74).h5"
    # model_path = "efficientnet_v1.h5"
    # model = load_model(model_path)
    model = tf.keras.models.load_model(model_path)
    train_input_shape = (224, 224, 3)
    labels = ['depression', 'violence', 'happiness']

    # web_image = imageio.imread(url)
    web_image = iio.imread(url)
    web_image = cv2.cvtColor(web_image, cv2.COLOR_RGBA2RGB)
    web_image = cv2.resize(web_image, dsize=train_input_shape[0:2], )
    # web_image = image.img_to_array(web_image)
    web_image = tf.keras.preprocessing.image.img_to_array(web_image)
    web_image /= 255.
    web_image = np.expand_dims(web_image, axis=0)
    prediction = model.predict(web_image)
    # prediction_probability = np.amax(prediction)
    # prediction_idx = np.argmax(prediction)
    # emotion = labels[prediction_idx]
    # data = {"emotion": emotion, "prediction": prediction_probability}
    return prediction[0]