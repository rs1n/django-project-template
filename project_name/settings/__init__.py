"""
Default environment is "dev".

To use another one set the "DJANGO_SETTINGS_MODULE" environment variable, e.g.:
export DJANGO_SETTINGS_MODULE={{ project_name }}.settings.prod

For more information see
https://docs.djangoproject.com/en/{{ docs_version }}/topics/settings/#envvar-DJANGO_SETTINGS_MODULE
"""

from .development import *
