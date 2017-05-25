"""
Default environment is "dev".

To use another one set the "DJANGO_SETTINGS_MODULE" environment variable.

For more information see
https://docs.djangoproject.com/en/{{ docs_version }}/topics/settings/#envvar-DJANGO_SETTINGS_MODULE
"""

from .dev import *
