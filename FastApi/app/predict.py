import tensorflow as tf
import numpy as np
import cv2
import imageio
# from tensorflow.keras.preprocessing import image

def predict(url):
    model_path = "/code/app/efficientnet_v1.h5"
    # model = load_model(model_path)
    model = tf.keras.models.load_model(model_path)
    train_input_shape = (224, 224, 3)
    labels = ['depression', 'violence', 'happiness']

    web_image = imageio.imread(url)
    web_image = web_image[:,:,:3]
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