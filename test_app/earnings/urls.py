from django.urls import path, include
from .api import EarningsView


urlpatterns = [
  path('api/earnings', EarningsView.as_view())
]
