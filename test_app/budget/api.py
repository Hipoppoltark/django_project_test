from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import BudgetSerializer
from accounts.permissions import IsAuthor


class BudgetView(ListCreateAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        user = self.request.user
        return user.budgets.all()

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class SingleBudgetView(RetrieveUpdateDestroyAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [
        IsAuthor
    ]

    def get_queryset(self):
        user = self.request.user
        return user.budgets.all()


