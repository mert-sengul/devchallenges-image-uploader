from django.urls import path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from . import views

urlpatterns = [
    path("docs/", include_docs_urls(title="Image Upload Service"), name="api-docs")
]

router = routers.DefaultRouter()
router.register("images", views.ImageViewSet, basename="image")

urlpatterns += router.urls
