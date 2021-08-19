from django.apps import AppConfig
from django.test.client import Client
from django.urls import reverse_lazy
from django.conf import settings
import os


def copy_schema():
    """Updates the `schema.js` file in the frontend by
    issuing a mock GET request to 'api-docs'."""

    schema_url = reverse_lazy("api-docs:schema-js")
    schema_path = os.path.join(settings.BASE_DIR, "frontend", "src", "schema.js")
    c = Client(HTTP_HOST='127.0.0.1:8000')
    resp = c.get(schema_url)


    if resp.status_code == 200:
        content = resp.content.decode(resp.charset)
        with open(schema_path, "w") as file:
            file.write(content)


class ApiConfig(AppConfig):
    name = "api"

    def ready(self) -> None:

        from . import signals

        copy_schema()
        return super().ready()
