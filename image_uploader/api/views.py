from django.http.response import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.views.generic import CreateView
from .models import Image
# Create your views here.

def image_detail_view(request, pk):
    img = get_object_or_404(Image, pk=pk)
    return render(request, 'api/detail.html', context={'img':img})

class DemoView(CreateView):
    model = Image
    fields = ['file', ]