import os
from celery import Celery
import logging

logging.debug("XXX start celery.py")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
logging.debug("XXX end celery.py")