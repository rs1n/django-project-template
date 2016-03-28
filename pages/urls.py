from django.conf.urls import url

from pages import views


app_name = 'pages'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^about/$', views.about, name='about'),
]
