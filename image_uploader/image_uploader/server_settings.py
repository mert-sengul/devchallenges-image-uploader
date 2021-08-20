from image_uploader.image_uploader.local_settings import CORS_ALLOWED_ORIGINS, INSTALLED_APPS
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

ALLOWED_HOSTS = []
CORS_ALLOWED_ORIGINS = []
SECRET_KEY = os.environ['VIRTUALENV_django_secret_key']
INSTALLED_APPS = []

def INJECT_MIDDLEWARE(MW):
    MW = list(MW)
    return MW