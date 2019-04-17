from django.conf.urls import url
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^test/$', views.test),
    url(r'^available/$', views.available_change),
]