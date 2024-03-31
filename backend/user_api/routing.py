from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from . import consumers

from django.core.asgi import get_asgi_application
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": URLRouter([
        path("ws/notifications/", consumers.NotificationConsumer.as_asgi()),
    ]),
})