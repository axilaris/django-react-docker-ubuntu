from __future__ import absolute_import, unicode_literals

from celery import shared_task
import logging

@shared_task
def add(x, y):
    logging.debug("XXX add")
    return x + y