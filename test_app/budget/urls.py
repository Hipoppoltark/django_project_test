from django.urls import path, include
from .api import BudgetView, SingleBudgetView


urlpatterns = [
  path('api/budgets', BudgetView.as_view()),
  path('api/budgets/<int:pk>', SingleBudgetView.as_view()),
]
