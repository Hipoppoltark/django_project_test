from rest_framework import permissions
from rest_framework.generics import get_object_or_404
from rest_framework.generics import ListCreateAPIView
from .serializers import EarningsSerializer
from .filters import EarningsFilter
from tools.pagination import StandardResultsSetPagination
import django_filters


class EarningsView(ListCreateAPIView):
    serializer_class = EarningsSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = EarningsFilter
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        user = self.request.user
        budget = get_object_or_404(user.budgets.all(), id=self.request.query_params['budget_id'])
        return budget.earnings.all()

    def perform_create(self, serializer):
        user = self.request.user
        budget = get_object_or_404(user.budgets.all(), id=self.request.query_params['budget_id'])
        return serializer.save(budget=budget)
