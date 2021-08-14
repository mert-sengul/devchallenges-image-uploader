from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Image
import django.utils.timezone as tz
import threading

INTERVAL = 60  # life expectancy of uploaded images, in seconds.


def delete_images_task(instance: Image, *args, **kwargs) -> None:
    """Delete Image instances from the db after INTERVAL seconds (default:60).
    Deletion of files in the filesystem is handled by each instance's .delete() method."""

    # timing of `threading.Timer` is unreliable
    max_date = tz.now() - tz.timedelta(seconds=INTERVAL)
    saved_images = Image.objects.filter(created_at__lte=max_date)
    for img in saved_images:
        img.delete()


@receiver(post_save, sender=Image)
def handle_post_save(sender, instance, created, **kwargs):
    """Run delete_images_task after a minute"""
    if created:
        t = threading.Timer(
            interval=INTERVAL, function=delete_images_task, args=[instance]
        )
        t.start()
