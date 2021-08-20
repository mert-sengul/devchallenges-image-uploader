"""
Django settings for image_uploader project.

Generated by 'django-admin startproject' using Django 3.0.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

FRONTEND_ROOT = os.path.join(BASE_DIR, "frontend")
FRONTEND_BUILD = os.path.join(FRONTEND_ROOT, "build")

STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATIC_URL = "/static/"

STATICFILES_DIRS = [
    ("frontend", FRONTEND_BUILD),
    ("js", os.path.join(FRONTEND_BUILD, "static", "js")),
    ("css", os.path.join(FRONTEND_BUILD, "static", "css")),
]

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"



# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

if DEBUG:
    from . import local_settings
else:
    from . import server_settings as local_settings

ALLOWED_HOSTS = local_settings.ALLOWED_HOSTS.copy()

CORS_ALLOWED_ORIGINS = local_settings.CORS_ALLOWED_ORIGINS.copy()


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = local_settings.SECRET_KEY

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "api",
] + local_settings.INSTALLED_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

MIDDLEWARE = local_settings.INJECT_MIDDLEWARE(MIDDLEWARE)


ROOT_URLCONF = "image_uploader.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            FRONTEND_BUILD,
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

REST_FRAMEWORK = {
   "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.coreapi.AutoSchema",
}


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


WSGI_APPLICATION = "image_uploader.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
# Database config resides in ./local_settings.py

DATABASES = local_settings.DATABASES


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True
