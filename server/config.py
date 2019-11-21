import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    # ...
    MONGO_USERNAME = 'DaniEzzeddine'
    MONGO_PASSWORD = 'daserik20'
    MONGO_DB = 'Camagru'
    MONGO_HOST = 'mongodb+srv://dezzeddi:daserik20@camagrucluster-hmfw4.mongodb.net/test?retryWrites=true&w=majority'
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    Mail_USE_SSL = True
    MAIL_USERNAME = 'dani.izzedin@gmail.com'
    MAIL_PASSWORD = 'dezzeddi200'
    SECRET_KEY = 'QWEQWEQWEQWEQWE'
    JWT_SECRET_KEY = 'CAMAGRU'
    ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
    UPLOAD_FOLDER = 'static/uploads/'