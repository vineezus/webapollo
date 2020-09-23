from rest_framework import routers
from django.urls import path
from .views import SizingView

urlpatterns = [
    path('', SizingView.as_view(), name='sizing_calculate')
]