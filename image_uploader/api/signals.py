from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Image
import django.utils.timezone as tz
import threading

INTERVAL = 6000  # life expectancy of uploaded images, in seconds.


def delete_images_task() -> None:
    """Delete Image instances from the db after INTERVAL seconds (default:60).
    Deletion of files in the filesystem is handled by each instance's delete() method."""

    # TODO: timing of `threading.Timer` is unreliable
    max_date = tz.now() - tz.timedelta(seconds=INTERVAL)
    saved_images = Image.objects.filter(created_at__lte=max_date)
    for image in saved_images:
        image.delete()


@receiver(post_save, sender=Image)
def handle_post_save(sender, created, *args, **kwargs) -> None:
    if created:
        thread = threading.Timer(interval=INTERVAL, function=delete_images_task)
        thread.start()
