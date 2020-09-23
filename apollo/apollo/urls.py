from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('frontend.urls')),
    path('api/', include('apolloapp.urls'), name='sizing'),
]
