"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

# import os

# from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# application = get_asgi_application()

import os
from django.core.asgi import get_asgi_application
from django.urls import path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_asgi_application()

# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.routing import get_default_application

#import backend.routing
#import user_api.routing
#from user_api.consumers import NotificationConsumer 

# application = ProtocolTypeRouter({
#     "websocket": URLRouter([
#         path("ws/notifications/", consumers.NotificationConsumer.as_asgi()),
#     ]),
# })

# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     "websocket": URLRouter(
#         user_api.routing.websocket_urlpatterns
#         #backend.routing.websocket_urlpatterns
#     ),
# })

# application = ProtocolTypeRouter({     
#             "websocket": URLRouter([         
#                 path("/ws/notifications/", consumers.NotificationConsumer.as_asgi()),     
#                 ]), 
#             }) 

# application = get_default_application()

# application = ProtocolTypeRouter(
#     {
#         "http": get_asgi_application(),
#         # Just HTTP for now. (We can add other protocols later.)
#     }
# )




