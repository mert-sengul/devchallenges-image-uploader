from django.db import models
from django.utils import timezone
from django.urls import reverse_lazy

# Create your models here.


class Image(models.Model):
    file = models.ImageField(upload_to="uploaded")
    created_at = models.DateTimeField(
        default=timezone.now, auto_created=True, editable=False
    )

    def get_absolute_url(self):
        return reverse_lazy("image-detail", kwargs={"pk": self.pk})

    def delete(self, *args, **kwargs):
        self.file.delete()
        return super().delete(*args, **kwargs)
