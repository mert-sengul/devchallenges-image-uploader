from django.apps import AppConfig


class ApiConfig(AppConfig):
    name = 'api'

    def ready(self) -> None:
        from . import signals
        return super().ready()
