import django_filters.rest_framework
from rest_framework import permissions
from rest_framework.generics import get_object_or_404
from rest_framework.generics import ListCreateAPIView, GenericAPIView
from rest_framework.mixins import ListModelMixin
from .serializers import WasteMoneySerializer, CategorySerializer
from .filters import WasteMoneyFilter
from tools.pagination import StandardResultsSetPagination
from .models import Category


class WasteMoneyView(ListCreateAPIView):
    serializer_class = WasteMoneySerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_class = WasteMoneyFilter
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        user = self.request.user
        budget = get_object_or_404(user.budgets.all(), id=self.request.query_params['budget_id'])
        return budget.waste_money.all()

    def perform_create(self, serializer):
        user = self.request.user
        budget = get_object_or_404(user.budgets.all(), id=self.request.query_params['budget_id'])
        return serializer.save(budget=budget)


class CategoryView(GenericAPIView, ListModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def paginate_queryset(self, queryset, view=None):
        return
