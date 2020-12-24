from django.urls import path
from .views import OffSizingView, OnSizingView, CitiesViewSet

urlpatterns = [
    path('cities/', CitiesViewSet.as_view({'get': 'list'}), name='sizing_off'),
    path('off/', OffSizingView.as_view(), name='sizing_off'),
    path('on/', OnSizingView.as_view(), name='sizing_on')
]