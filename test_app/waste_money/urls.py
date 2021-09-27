from django.urls import path, include
from .api import WasteMoneyView, CategoryView


urlpatterns = [
  path('api/waste_money', WasteMoneyView.as_view()),
  path('api/categories', CategoryView.as_view())
]
