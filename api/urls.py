from django.conf.urls import url
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^change/$', views.get_change),
    url(r'^pay/$', views.save_payment),
]