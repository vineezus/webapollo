from django.urls import path
from .views import OffSizingView, OnSizingView

urlpatterns = [
    path('off/', OffSizingView.as_view(), name='sizing_off'),
    path('on/', OnSizingView.as_view(), name='sizing_on')
]