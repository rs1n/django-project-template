'Development environment settings'

from .base import *

# Custom middleware for development environment.
DEV_MIDDLEWARE = [
    'foo.middleware.LogProcessingTimeMiddleware',
]

MIDDLEWARE.extend(DEV_MIDDLEWARE)
