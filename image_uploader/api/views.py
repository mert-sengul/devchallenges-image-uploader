from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from .serializers import ImageSerializer
from .models import Image

# Create your views here.


def image_detail_view(request, pk):
    img = get_object_or_404(Image, pk=pk)
    return render(request, "api/detail.html", context={"img": img})


class ImageViewSet(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
