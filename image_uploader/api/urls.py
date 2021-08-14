from django.urls import path
from . import views

urlpatterns = [
    path('', views.DemoView.as_view()),
    path('img/<slug:pk>/', views.image_detail_view, name='image-detail')
]